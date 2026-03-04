import json, sys

for fname, lang in [("pt-br.json","pt"), ("pt-pt.json","pt"), ("pt.json","pt"), ("en-us.json","en"), ("en-gb.json","en")]:
    # Start from v3 file
    src = "/mnt/user-data/outputs/v3/app/js/translations/languages/" + fname
    try:
        with open(src, "r") as f: d = json.load(f)
    except:
        continue

    cp = d.setdefault("cleanupPage", {})
    cats = cp.setdefault("categories", {})

    if lang == "pt":
        cats["snaps"] = {"title": "Snaps Desativados", "short": "Snaps", "desc": "Versões antigas desabilitadas de snaps"}
        cats["user-cache"] = {"title": "Caches de Dev", "short": "Caches Dev", "desc": "Cache de aplicativos em ~/.cache"}
        cats["temp-files"] = {"title": "Arquivos Temporários", "short": "Temporários", "desc": "Arquivos temporários em /tmp do seu usuário"}
        cats["thumbnails"] = {"title": "Thumbnails", "short": "Thumbnails", "desc": "Miniaturas geradas pelo gerenciador de arquivos"}
        cats["package-cache"] = {"title": "Cache Zypper", "short": "Zypper", "desc": "Pacotes baixados pelo gerenciador de pacotes"}
        cats["trash"] = {"title": "Lixeira (KDE)", "short": "Lixeira", "desc": "Arquivos na lixeira do sistema"}
        cats["baloo"] = {"title": "Baloo (Indexação KDE)", "short": "Baloo", "desc": "Índice de busca do KDE Plasma"}
        cats["browser-cache"] = {"title": "Caches de Navegador", "short": "Navegador", "desc": "Cache do Firefox, Chrome, Brave e outros"}
        cats["journal-logs"] = {"title": "Journal Logs", "short": "Journal", "desc": "Logs do systemd journal"}
        cats["flatpak-cache"] = {"title": "Caches Flatpak", "short": "Flatpak", "desc": "Cache e runtimes não utilizados do Flatpak"}
        cp["tabCleanupLabel"] = "Limpeza"
        cp["tabDownloadsLabel"] = "Downloads"
        cp["tabLargestLabel"] = "Maiores arquivos"
        cp["downloadsTitle"] = "Pasta de Downloads"
        cp["downloadsBtn"] = "Analisar"
        cp["downloadsInfo"] = "Clique em Analisar para ver os arquivos na pasta Downloads ordenados por tamanho."
        cp["largestTitle"] = "20 maiores arquivos"
        cp["largestBtn"] = "Analisar"
        cp["largestInfo"] = "Clique em Analisar para encontrar os 20 maiores arquivos na sua pasta pessoal."
    else:
        cats["snaps"] = {"title": "Disabled Snaps", "short": "Snaps", "desc": "Old disabled snap revisions"}
        cats["user-cache"] = {"title": "Dev Caches", "short": "Dev Caches", "desc": "Application cache files in ~/.cache"}
        cats["temp-files"] = {"title": "Temporary Files", "short": "Temp Files", "desc": "User temp files in /tmp"}
        cats["thumbnails"] = {"title": "Thumbnails", "short": "Thumbnails", "desc": "Image thumbnails from file manager"}
        cats["package-cache"] = {"title": "Zypper Cache", "short": "Zypper", "desc": "Downloaded packages from Zypper"}
        cats["trash"] = {"title": "Trash (KDE)", "short": "Trash", "desc": "Files in your trash can"}
        cats["baloo"] = {"title": "Baloo (KDE Index)", "short": "Baloo", "desc": "KDE Baloo search index"}
        cats["browser-cache"] = {"title": "Browser Caches", "short": "Browser", "desc": "Firefox, Chrome, Brave caches"}
        cats["journal-logs"] = {"title": "Journal Logs", "short": "Journal", "desc": "Systemd journal logs"}
        cats["flatpak-cache"] = {"title": "Flatpak Caches", "short": "Flatpak", "desc": "Flatpak cache and unused runtimes"}
        cp["tabCleanupLabel"] = "Cleanup"
        cp["tabDownloadsLabel"] = "Downloads"
        cp["tabLargestLabel"] = "Largest files"
        cp["downloadsTitle"] = "Downloads folder"
        cp["downloadsBtn"] = "Analyze"
        cp["downloadsInfo"] = "Click Analyze to see files in your Downloads folder sorted by size."
        cp["largestTitle"] = "20 largest files"
        cp["largestBtn"] = "Analyze"
        cp["largestInfo"] = "Click Analyze to find the 20 largest files in your home directory."

    with open(fname, "w") as f: json.dump(d, f, ensure_ascii=False, indent=4)
    print("OK: " + fname)

