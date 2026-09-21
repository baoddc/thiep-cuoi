<#
.SYNOPSIS
    Script tự động tải toàn bộ 32 ảnh cưới từ thư mục 'img' lên Cloudflare R2.
    Không yêu cầu cài đặt Node.js hay Python - chạy trực tiếp trên Windows PowerShell.

.DESCRIPTION
    Script sử dụng chuẩn AWS S3 Signature Version 4 (SigV4) thuần với .NET có sẵn trên Windows.
    Giữ nguyên 100% tên file (TUABxxxx.JPG) và định dạng JPG gốc.

.USAGE
    1. Chạy PowerShell tại thư mục dự án:
       .\scripts\upload-r2.ps1
    2. Hoặc truyền trực tiếp tham số:
       .\scripts\upload-r2.ps1 -AccountId "xxx" -AccessKeyId "xxx" -SecretAccessKey "xxx" -BucketName "wedding-photos"
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory=$false)]
    [string]$AccountId,

    [Parameter(Mandatory=$false)]
    [string]$AccessKeyId,

    [Parameter(Mandatory=$false)]
    [string]$SecretAccessKey,

    [Parameter(Mandatory=$false)]
    [string]$BucketName,

    [Parameter(Mandatory=$false)]
    [string]$ImageFolder = "img"
)

# Chuyển đổi mã hóa tiếng Việt
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Upload Ảnh Lên Cloudflare R2"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   CÔNG CỤ UPLOAD ẢNH CƯỚI LÊN CLOUDFLARE R2 STORAGE    " -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra thư mục ảnh
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptRoot
$fullImgPath = Join-Path $projectRoot $ImageFolder

if (-not (Test-Path $fullImgPath)) {
    Write-Host "[LỖI] Không tìm thấy thư mục ảnh tại: $fullImgPath" -ForegroundColor Red
    Exit 1
}

$imageFiles = Get-ChildItem -Path $fullImgPath -Filter "*.JPG" -File
if ($imageFiles.Count -eq 0) {
    # Thử tìm file .jpg (chữ thường) nếu không thấy .JPG
    $imageFiles = Get-ChildItem -Path $fullImgPath -Include "*.jpg", "*.jpeg", "*.png", "*.JPG", "*.PNG" -Recurse -File
}

if ($imageFiles.Count -eq 0) {
    Write-Host "[LỖI] Không có file ảnh nào trong thư mục: $fullImgPath" -ForegroundColor Red
    Exit 1
}

Write-Host "Đã tìm thấy $($imageFiles.Count) file ảnh trong thư mục '$ImageFolder'." -ForegroundColor Green
Write-Host ""

# Kiểm tra file cấu hình r2_credentials.json (nếu có sẵn)
$configFile = Join-Path $scriptRoot "r2_config.json"
if (Test-Path $configFile) {
    try {
        $savedConfig = Get-Content $configFile -Raw | ConvertFrom-Json
        if (-not $AccountId -and $savedConfig.AccountId) { $AccountId = $savedConfig.AccountId }
        if (-not $AccessKeyId -and $savedConfig.AccessKeyId) { $AccessKeyId = $savedConfig.AccessKeyId }
        if (-not $SecretAccessKey -and $savedConfig.SecretAccessKey) { $SecretAccessKey = $savedConfig.SecretAccessKey }
        if (-not $BucketName -and $savedConfig.BucketName) { $BucketName = $savedConfig.BucketName }
        Write-Host "Đã nạp thông tin tài khoản từ $configFile" -ForegroundColor Gray
    } catch {}
}

# Nhắc người dùng nhập nếu chưa có
if (-not $AccountId) {
    $AccountId = Read-Host "Nhập Cloudflare Account ID"
}
if (-not $AccessKeyId) {
    $AccessKeyId = Read-Host "Nhập R2 Access Key ID"
}
if (-not $SecretAccessKey) {
    $SecretAccessKey = Read-Host "Nhập R2 Secret Access Key"
}
if (-not $BucketName) {
    $BucketName = Read-Host "Nhập tên R2 Bucket (ví dụ: wedding-photos)"
}

if (-not $AccountId -or -not $AccessKeyId -or -not $SecretAccessKey -or -not $BucketName) {
    Write-Host "[LỖI] Thiếu thông tin xác thực Cloudflare R2. Dừng chương trình." -ForegroundColor Red
    Exit 1
}

# Lưu cấu hình để lần sau không cần nhập lại
$configToSave = @{
    AccountId = $AccountId
    AccessKeyId = $AccessKeyId
    SecretAccessKey = $SecretAccessKey
    BucketName = $BucketName
}
$configToSave | ConvertTo-Json | Set-Content -Path $configFile -Encoding UTF8
Write-Host "Đã lưu thông tin cấu hình vào $configFile" -ForegroundColor DarkGray
Write-Host ""

# Hàm tính toán Hash và SigV4
function Get-SHA256HashBytes([byte[]]$bytes) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    $hash = $sha.ComputeHash($bytes)
    $sb = New-Object System.Text.StringBuilder
    foreach ($b in $hash) { [void]$sb.Append($b.ToString("x2")) }
    return $sb.ToString()
}

function Get-HMACSHA256Bytes([byte[]]$key, [string]$data) {
    $hmac = New-Object System.Security.Cryptography.HMACSHA256
    $hmac.Key = $key
    $dataBytes = [System.Text.Encoding]::UTF8.GetBytes($data)
    return $hmac.ComputeHash($dataBytes)
}

function Get-HexSignature([byte[]]$key, [string]$data) {
    $hash = Get-HMACSHA256Bytes -key $key -data $data
    $sb = New-Object System.Text.StringBuilder
    foreach ($b in $hash) { [void]$sb.Append($b.ToString("x2")) }
    return $sb.ToString()
}

$region = "auto"
$service = "s3"
$hostName = "$AccountId.r2.cloudflarestorage.com"
$total = $imageFiles.Count
$current = 0
$successCount = 0
$errorCount = 0

Write-Host "Bắt đầu tải $total ảnh lên bucket '$BucketName'..." -ForegroundColor Cyan
Write-Host "Host: https://$hostName/$BucketName/" -ForegroundColor Gray
Write-Host "---------------------------------------------------------"

foreach ($file in $imageFiles) {
    $current++
    $fileName = $file.Name
    $objectKey = $fileName
    $filePath = $file.FullName
    $percent = [math]::Round(($current / $total) * 100)

    Write-Host "[$current/$total - $percent%] Đang tải: $fileName ($([math]::Round($file.Length / 1MB, 2)) MB)... " -NoNewline

    try {
        $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
        $payloadHash = Get-SHA256HashBytes -bytes $fileBytes

        $now = [System.DateTime]::UtcNow
        $amzDate = $now.ToString("yyyyMMddTHHmmssZ")
        $dateStamp = $now.ToString("yyyyMMdd")

        $canonicalUri = "/$BucketName/$objectKey"
        $canonicalQueryString = ""
        $canonicalHeaders = "host:$hostName`nx-amz-content-sha256:$payloadHash`nx-amz-date:$amzDate`n"
        $signedHeaders = "host;x-amz-content-sha256;x-amz-date"

        $canonicalRequest = "PUT`n$canonicalUri`n$canonicalQueryString`n$canonicalHeaders`n$signedHeaders`n$payloadHash"
        $canonicalRequestHash = Get-SHA256HashBytes -bytes ([System.Text.Encoding]::UTF8.GetBytes($canonicalRequest))

        $algorithm = "AWS4-HMAC-SHA256"
        $credentialScope = "$dateStamp/$region/$service/aws4_request"
        $stringToSign = "$algorithm`n$amzDate`n$credentialScope`n$canonicalRequestHash"

        # Tính Signing Key
        $kSecret = [System.Text.Encoding]::UTF8.GetBytes("AWS4$SecretAccessKey")
        $kDate = Get-HMACSHA256Bytes -key $kSecret -data $dateStamp
        $kRegion = Get-HMACSHA256Bytes -key $kDate -data $region
        $kService = Get-HMACSHA256Bytes -key $kRegion -data $service
        $kSigning = Get-HMACSHA256Bytes -key $kService -data "aws4_request"

        $signature = Get-HexSignature -key $kSigning -data $stringToSign
        $authorization = "$algorithm Credential=$AccessKeyId/$credentialScope, SignedHeaders=$signedHeaders, Signature=$signature"

        $url = "https://$hostName$canonicalUri"

        # Thiết lập request
        $request = [System.Net.HttpWebRequest]::Create($url)
        $request.Method = "PUT"
        $request.Headers.Add("x-amz-date", $amzDate)
        $request.Headers.Add("x-amz-content-sha256", $payloadHash)
        $request.Headers.Add("Authorization", $authorization)
        $request.ContentType = "image/jpeg"
        $request.ContentLength = $fileBytes.Length
        $request.Timeout = 120000 # 120s timeout cho file 10MB

        $stream = $request.GetRequestStream()
        $stream.Write($fileBytes, 0, $fileBytes.Length)
        $stream.Close()

        $response = $request.GetResponse()
        $response.Close()

        Write-Host "THÀNH CÔNG" -ForegroundColor Green
        $successCount++
    }
    catch [System.Net.WebException] {
        $errorCount++
        $res = $_.Exception.Response
        if ($res) {
            $streamReader = New-Object System.IO.StreamReader($res.GetResponseStream())
            $errBody = $streamReader.ReadToEnd()
            Write-Host "THẤT BẠI: $errBody" -ForegroundColor Red
        } else {
            Write-Host "THẤT BẠI: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    catch {
        $errorCount++
        Write-Host "THẤT BẠI: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "---------------------------------------------------------"
Write-Host "KẾT QUẢ: Hoàn thành $successCount/$total ảnh ($errorCount lỗi)." -ForegroundColor $(if ($errorCount -eq 0) { "Green" } else { "Yellow" })
Write-Host ""
Write-Host "BƯỚC TIẾP THEO:" -ForegroundColor Cyan
Write-Host "1. Mở Cloudflare Dashboard > R2 > Bucket '$BucketName' > Settings"
Write-Host "2. Bật 'Public Development R2.dev URL' (hoặc gắn Custom Domain)"
Write-Host "3. Copy link public (ví dụ: https://pub-xxxxxxxx.r2.dev)"
Write-Host "4. Dán link này vào biến 'r2PublicUrl' trong file 'js/config.js'."
Write-Host "=========================================================" -ForegroundColor Cyan
