#!/usr/bin/env python3
"""
Déclinaisons du logo Pulse à partir du fichier source livré par le designer.

Source : assets/pulse.jpg (1254x1254, JPEG opaque, fond blanc).
Le fichier source n'est pas servi tel quel : son fond blanc jure sur l'encre du
header et sur l'ivoire des sections, et sa baseline est illisible sous 60 px.

Ce script produit deux familles :
  - le pictogramme détouré, pour le header et le footer, où le nom
    « SmatchRoom Pulse » reste du texte HTML juste à côté ;
  - le logo complet sur fond plein, pour les favicons, l'icône PWA et les
    vignettes de partage, qui n'acceptent pas de transparence de façon fiable.

Détourage : remplissage depuis les bords, pas un remplacement global du blanc.
Les contre-formes internes (fenêtre du P, boucles du « a », du « o », du « e »)
représentent 0,7 % du blanc de l'image et doivent survivre, sinon le dessin se
troue. Ne pas remplacer par un simple seuil sur la luminance.

Relancer après toute nouvelle livraison du logo :
    python3 scripts/build-brand-assets.py
"""

from collections import deque
from pathlib import Path

from PIL import Image

RACINE = Path(__file__).resolve().parent.parent
SOURCE = Path("/root/smatchroom-ecosystem/assets/pulse.jpg")
MARQUE = RACINE / "public" / "brand"
APP = RACINE / "src" / "app"

# Fond des sections du site, repris de globals.css. L'ivoire sert de fond aux
# vignettes de partage pour que la carte Facebook ou LinkedIn ait la couleur du
# site et non un blanc de formulaire.
IVOIRE = (246, 244, 239)
BLANC = (255, 255, 255)

# Le JPEG a été enregistré en qualité 75 : le blanc du fond n'est pas pur et
# bave autour des contours. Un seuil à 228 attrape le fond et les artefacts de
# compression sans manger l'anticrénelage des lettres.
SEUIL_BLANC = 228


def detourer(im):
    """Rend transparent le blanc connecté aux bords, préserve le blanc interne."""
    im = im.convert("RGB")
    largeur, hauteur = im.size
    px = im.load()

    def est_blanc(x, y):
        r, v, b = px[x, y]
        return r > SEUIL_BLANC and v > SEUIL_BLANC and b > SEUIL_BLANC

    vu = bytearray(largeur * hauteur)
    file = deque()

    def amorcer(x, y):
        if est_blanc(x, y) and not vu[y * largeur + x]:
            vu[y * largeur + x] = 1
            file.append((x, y))

    for x in range(largeur):
        amorcer(x, 0)
        amorcer(x, hauteur - 1)
    for y in range(hauteur):
        amorcer(0, y)
        amorcer(largeur - 1, y)

    while file:
        x, y = file.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < largeur and 0 <= ny < hauteur and not vu[ny * largeur + nx]:
                if est_blanc(nx, ny):
                    vu[ny * largeur + nx] = 1
                    file.append((nx, ny))

    sortie = im.convert("RGBA")
    out = sortie.load()
    for y in range(hauteur):
        for x in range(largeur):
            if vu[y * largeur + x]:
                out[x, y] = (255, 255, 255, 0)
    return sortie


def bandes_de_contenu(im):
    """Découpe verticale du logo : pictogramme, wordmark, PULSE, baseline."""
    im_rgb = im.convert("RGB")
    largeur, hauteur = im_rgb.size
    px = im_rgb.load()
    pleines = []
    for y in range(hauteur):
        for x in range(0, largeur, 3):
            r, v, b = px[x, y]
            if r < 235 or v < 235 or b < 235:
                pleines.append(y)
                break
    bandes, debut, precedent = [], None, None
    for y in pleines:
        if debut is None:
            debut = y
        elif y - precedent > 8:
            bandes.append((debut, precedent))
            debut = y
        precedent = y
    if debut is not None:
        bandes.append((debut, precedent))
    return bandes


def rogner_au_contenu(im):
    """Rogne sur le rectangle non transparent."""
    boite = im.getbbox()
    return im.crop(boite) if boite else im


def aplatir(im, fond, marge=0.12):
    """Pose l'image sur un carré de couleur pleine, avec une marge optique."""
    im = rogner_au_contenu(im)
    cote = int(max(im.size) * (1 + marge * 2))
    plaque = Image.new("RGBA", (cote, cote), fond + (255,))
    plaque.paste(im, ((cote - im.width) // 2, (cote - im.height) // 2), im)
    return plaque


def carre(im, cote, fond):
    return aplatir(im, fond).resize((cote, cote), Image.LANCZOS).convert("RGB")


def main():
    if not SOURCE.exists():
        raise SystemExit(f"logo source introuvable : {SOURCE}")

    MARQUE.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE)
    detoure = detourer(source)
    bandes = bandes_de_contenu(source)
    if not bandes:
        raise SystemExit("aucun contenu détecté dans le logo source")

    # Le pictogramme est la première bande : le P à la flèche, sans texte.
    haut, bas = bandes[0]
    picto = rogner_au_contenu(detoure.crop((0, haut, source.width, bas + 1)))
    logo = rogner_au_contenu(detoure)

    # Header et footer : affiché à 28 px de haut, servi à 224 px, soit 8x.
    # Reste net en densité 2x et 3x sans peser (PNG indexé sur peu de couleurs).
    h_picto = 224
    picto_web = picto.resize(
        (round(picto.width * h_picto / picto.height), h_picto), Image.LANCZOS
    )
    picto_web.save(MARQUE / "pulse-picto.png", optimize=True)

    # Logo complet détouré, pour tout usage sur fond clair du site.
    h_logo = 320
    logo.resize(
        (round(logo.width * h_logo / logo.height), h_logo), Image.LANCZOS
    ).save(MARQUE / "pulse-logo.png", optimize=True)

    # schema.org : Google exige une URL absolue, une image carrée d'au moins
    # 112 px et un fond opaque. Le logo complet est lisible à 512 px.
    carre(logo, 512, BLANC).save(MARQUE / "pulse-logo-512.png", optimize=True)

    # Icônes PWA référencées par app/manifest.js.
    for cote in (192, 512):
        carre(picto, cote, BLANC).save(MARQUE / f"icon-{cote}.png", optimize=True)

    # Conventions de fichier Next : app/icon.png, app/apple-icon.png,
    # app/favicon.ico. Next en déduit lui-même les balises <link>, le type et
    # les dimensions, et versionne l'URL, ce qui règle le cache du favicon.
    carre(picto, 512, BLANC).save(APP / "icon.png", optimize=True)
    # iOS applique son propre masque arrondi et ne gère pas la transparence :
    # fond plein obligatoire, sinon l'icône sort sur un carré noir.
    carre(picto, 180, BLANC).save(APP / "apple-icon.png", optimize=True)
    # Le .ico doit être écrit en RGBA : Turbopack décode les PNG internes du
    # conteneur ICO avec un lecteur strict qui refuse le RGB
    # (« The PNG is not in RGBA format! ») et fait échouer le build. Le canal
    # alpha est plein, l'icône reste opaque, c'est le format qui change.
    favicon = aplatir(picto, BLANC).resize((48, 48), Image.LANCZOS).convert("RGBA")
    favicon.save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # Vignettes de partage : 1200x630, logo complet centré sur l'ivoire du site.
    # JPEG parce que la transparence n'a pas de sens ici et que le poids compte
    # (Facebook plafonne à 8 Mo, X à 5 Mo, on est trois ordres en dessous).
    vignette = Image.new("RGB", (1200, 630), IVOIRE)
    cible_h = 380
    v_logo = logo.resize(
        (round(logo.width * cible_h / logo.height), cible_h), Image.LANCZOS
    )
    vignette.paste(
        v_logo, ((1200 - v_logo.width) // 2, (630 - v_logo.height) // 2), v_logo
    )
    for nom in ("opengraph-image.jpg", "twitter-image.jpg"):
        vignette.save(APP / nom, quality=88, optimize=True, progressive=True)

    print("pictogramme  :", picto_web.size, "->", MARQUE / "pulse-picto.png")
    print("logo complet :", logo.size)
    print("vignette     :", vignette.size)
    for chemin in sorted(list(MARQUE.iterdir())) + [
        APP / "icon.png",
        APP / "apple-icon.png",
        APP / "favicon.ico",
        APP / "opengraph-image.jpg",
        APP / "twitter-image.jpg",
    ]:
        print(f"  {chemin.relative_to(RACINE)}  {chemin.stat().st_size // 1024} Ko")


if __name__ == "__main__":
    main()
