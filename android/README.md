# VOLT — Android + Shizuku

Natywna aplikacja Kotlin dla **realme 9 Pro 5G**. Steruje VoLTE / VoWiFi / RadioInfo przez **Shizuku** (uid shell, jak `adb shell`). Bez roota.

## Wymagania

1. Android Studio (Ladybug / nowszy)
2. [Shizuku](https://shizuku.rikka.app/) z Google Play albo GitHub
3. Telefon: realme 9 Pro 5G, debugowanie bezprzewodowe włączone

## Import

1. Android Studio → Open → folder `android`
2. Sync Gradle (wrapper wygeneruje Studio, jeśli go brakuje)
3. Run na telefonie (nie emulatorze — Shizuku na emulatorze bez parowania nie ma sensu)

## Shizuku na realme

1. Ustawienia → Informacje o telefonie → 7× numer kompilacji
2. Opcje programisty → **Debugowanie bezprzewodowe** → włącz
3. Otwórz Shizuku → Parowanie przez kod → wpisz kod z Debugowania bezprzewodowego
4. Start Shizuku
5. Otwórz VOLT → **Połącz Shizuku** → zezwól

## Co robią przyciski

| Przycisk | Polecenie |
|---|---|
| WRITE_SECURE_SETTINGS | `pm grant pl.volt.tuner android.permission.WRITE_SECURE_SETTINGS` |
| VoLTE | `settings put global volte_vt_enabled 1` (+ `vt_ims_enabled`, `enhanced_4g_lte_mode`) |
| VoWiFi | `settings put global wfc_ims_enabled 1` |
| NR/LTE | `settings put global preferred_network_mode 26` |
| RadioInfo | `am start` na `com.android.phone/.settings.RadioInfo` i wariant Settings |

Na ColorOS/Realme IMS bywa zablokowane przez konfigurację operatora — wtedy `settings put` wraca `exit=0`, a przełącznik VoLTE i tak zostaje szary. To ograniczenie firmware, nie Shizuku.

## API 13

`Shizuku.newProcess(arrayOf("sh","-c", cmd), null, null)` **nie istnieje** w `dev.rikka.shizuku:api:13.1.5`. Zastępuje je `Shizuku.bindUserService` + `Runtime.exec` w `ShellService` (ten sam uid shell).
