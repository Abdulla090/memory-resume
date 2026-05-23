# Zheer Android build fix (dolphinMascot AAPT error)

This folder contains the fix for:

```text
:app:mergeReleaseResources
AAPT: error: assets_images_characters_dolphinmascot.png: file failed to compile
```

## Apply on your Expo project (`Zheer_saz_doulingo`)

### PowerShell

```powershell
$project = "C:\path\to\Zheer_saz_doulingo"
Copy-Item -Recurse -Force ".\expo-android-fix\Zheer_saz_doulingo\characters\*" "$project\assets\images\characters\"
Copy-Item -Force ".\expo-android-fix\Zheer_saz_doulingo\fix-android-png-assets.py" "$project\scripts\fix-android-png-assets.py"
Remove-Item -Force "$project\assets\images\characters\character1.jpeg" -ErrorAction SilentlyContinue
cd $project
npm run fix:android-assets
eas build -p android --profile production --clear-cache
```

Add this script to `package.json` if missing:

```json
"fix:android-assets": "python3 scripts/fix-android-png-assets.py"
```

## What changed

- Re-encoded character PNGs to Android-safe 8-bit RGBA PNG
- Added valid `dolphinMascot.png`
- Removed stray `character1.jpeg` from characters folder
