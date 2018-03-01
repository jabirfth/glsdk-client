# Theming de l'application

[toc]

## Personnaliser le logo

Le logo se trouve au chemin `src/assets/img/logo.svg`.

## Architecture Sass

### Philosophie

Afin de rendre flexible l'application de thèmes, [Angular Material] sépare explicitement les styles basiques des composants de leurs styles visuels tels que les couleurs de textes, de fonds, de bordures, ou encore les ombres portées.

Il est par conséquent nécessaire d'isoler les styles visuels dans des fichiers distincts des autres styles mais également dans des mixins afin de maîtriser la génération des règles CSS.

Par convention, un fichier dédié au thème d'un composant reprend le nom du composant préfixé par `_` (underscore) et suffixé par `-theme` : le fichier de styles `my-component.scss` sera accompagné du fichier de thème `_my-component-theme.scss`.

### Arborescence

```
src/
├── app/
│   ├── _app-theme.component.scss
│   ├── app.component.scss
│   └── components/
│       └── menu/
│           ├── _menu-theme.component.scss
│           └── menu.component.scss
├── styles.scss
├── theme.scss
└── theming/
    ├── _all-theme.scss
    ├── _theming.scss
    ├── grandlyon/
    │   ├── config/
    │   │   ├── _palette.scss
    │   │   └── _variables.scss
    │   └── grandlyon.scss
    ├── theme_2/
    │   ├── config/
    │   │   ├── _palette.scss
    │   │   └── _variables.scss
    │   └── theme_2.scss
    └── shared/
        ├── _form-theme.scss
        ├── _layout.scss
        ├── _table-theme.scss
        └── _table.scss
```

## Créer un thème

Dans les exemples qui suivent,

- remplacez `THEMENAME` par le nom de votre thème, par exemple `grandlyon`.
- remplacez `MYCOMPONENT` par le nom de votre composant, par exemple `menu`.

### 1. Nouveau thème

Créer une nouvelle arborescence :

```sh
$ mkdir -p src/theming/THEMENAME/config/
$ touch src/theming/THEMENAME/THEMENAME.scss
$ touch src/theming/THEMENAME/config/_{palette,variables}.scss
```

### 2. Créer les palettes colorimétriques du thème

Les palettes colorimétriques sont à définir dans le fichier `src/theming/THEMENAME/config/_palette.scss`. Ce dernier hébergera toutes les déclarations de variables dédiées à la couleur du thème.

Voici un exemple de palette :

```scss
$gl-vermilion: (
    50:   #ffebeb,
    100:  #ff9f9f,
    200:  #ff6767,
    300:  #ff1f1f,
    400:  #ff0101,
    500:  #e10000,
    600:  #c20000,
    700:  #a40000,
    800:  #850000,
    900:  #670000,
    A100: #ffe1e1,
    A200: #ff7b7b,
    A400: #ff1515,
    A700: #fa0000,
    contrast: (
        50:   black,
        100:  black,
        200:  black,
        300:  white,
        400:  white,
        500:  white,
        600:  white,
        700:  white,
        800:  white,
        900:  white,
        A100: black,
        A200: black,
        A400: white,
        A700: white,
    )
);
```

Nous déclarons ici une palette *vermilion* que nous préfixons par le nom raccourci de l'organisation `gl-` (pour Grand Lyon).

**_Note_ :**  
Une bonne pratique Sass consiste à systématiquement préfixer toutes ses variables, mixins et autres fonctions afin d'éviter des collisions avec des bibliothèques tierces parties.

L'utilisation d'un générateur est possible. Par exemple, l'outil [Material Design Theme & Palette Color Generator](http://mcg.mbitson.com/#!?mcgpalette0=%23e10000&mcgpalette1=%23050707&themename=grandlyon) a été utilisé ici pour générer deux palettes de couleurs.

### 3. Déclarer les nouvelles palettes

En l'état les nouvelles palettes sont inutilisables par [Angular Material]. Il est nécessaire de les enrichir à l'aide du mixin `mat-palette()`.

Pour cela, déclarez vos palettes dans le fichier `src/theming/THEMENAME/config/_variables.scss` :

```scss
// File: src/theming/THEMENAME/config/_variables.scss

@import "palette";

// Palettes
// --------

$gl-theme-primary: mat-palette($gl-vermilion);
$gl-theme-accent:  mat-palette($gl-woodsmoke);
$gl-theme-warn:    mat-palette($gl-woodsmoke);
```

**_Note_ :**  
Le fichier `_palette.scss` est importé une seule fois pour tout le thème depuis le fichier `_variables.scss`. Ceci permet de réutiliser facilement les différentes variables du thème.

### 4. Instancier le thème

```scss
// File: src/theming/THEMENAME/THEMENAME.scss

// Charger les outils d'aide à la création de thèmes du projet.
@import '../theming';

// Charger les variables et les palettes du thème.
@import "config/variables";

// Exposer une variable globale de thème.
$gl-theme: mat-light-theme($gl-theme-primary, $gl-theme-accent, $gl-theme-warn);
```

### 5. Créer un mixin dédié au theming par composant Angular

```scss
// File: src/app/components/_MYCOMPONENT-theme.scss

@import '~@angular/material/theming';

@mixin app-MYCOMPONENT-theme($theme) {
  $primary:    map-get($theme, primary);
  $accent:     map-get($theme, accent);
  $warn:       map-get($theme, warn);
  $background: map-get($theme, background);
  $foreground: map-get($theme, foreground);

  .mat-list-item {
    &.active {
      .mat-list-icon {
        color: mat-color($primary, default);
      }
    }
  }
}
```

Le mixin *app-MYCOMPONENT-theme* est à référencer dans le mixin `app-components-theme()` du fichier `src/theming/_all-theme.scss` pour qu'il soit automatiquement appelé depuis le fichier `src/theme.scss` lors de l'invocation du mixin `app-theme()`.

Importez le fichier de thème et invoquez le mixin :

```scss
// File: src/theming/_all-theme.scss

@import "~app/components/MYCOMPONENT/MYCOMPONENT-theme.component";

@mixin app-components-theme($theme) {
  @include app-MYCOMPONENT-theme($theme);
}
```

**_Rappel_ :**  
Lors de l'importation du fichier, l'écriture du préfixe `_` (underscore) et de l'extension du fichier est optionnelle et est généralement omise.

### 6. Créer un mixin dédié au theming par outillage transverse

Les styles transverses au projets, c'est-à-dire qui ne sont pas propres à un seul composant, sont définis dans le répertoire `src/theming/shared/`.

Comme pour les composants, créez un fichier *app-shared-FILE-theme* qui acceuillera exclusivement les styles visuels :

```scss
// File: src/theming/shared/_form-theme.scss

@import '~@angular/material/theming';

@mixin app-shared-form-theme($theme) {
  $foreground: map-get($theme, foreground);

  form {
    .ng-valid {
      color: mat-color($foreground, valid);

      .mat-form-field-underline {
        background-color: mat-color($foreground, valid);
      }
    }

    .ng-invalid {
      color: mat-color($foreground, invalid);

      .mat-form-field-underline {
        background-color: mat-color($foreground, invalid);
      }
    }
  }

  .form-container {
    @include mat-elevation(2);
  }

}
```

Le mixin *app-shared-FILE-theme* est à référencer dans le mixin `app-shared-theme()` du fichier `src/theming/_all-theme.scss` pour qu'il soit automatiquement appelé depuis le fichier `src/theme.scss` lors de l'invocation du mixin `app-theme()`.

## Utiliser un thème



```scss
// File: src/theme.scss

// Charger les outils Material Design
@import '~@angular/material/theming';

// Charger les outils de theming des composants
@import 'theming/all-theme';

// Charger le thème principal.
// Expose ici la variable de thème `$gl-theme`.
@import 'theming/THEMENAME/THEMENAME';

// **Important** : le mixin `mat-core()` ne doit être appélé
// qu'une seule fois dans le projet puisqu'il génère des styles CSS.
@include mat-core();

// Générer les styles de thème propres à Angular Material.
@include angular-material-theme($gl-theme);

// Générer les styles de thème de nos composants.
@include app-theme($gl-theme);
```

## Personnaliser les clés de thème de palette

Angular Material s'appuie énormément sur les clés `background` et `foreground` des palettes d'un thème pour définir l'aspect visuel de ses composants (exemple avec [mat-table](https://github.com/angular/material2/blob/5.0.3/src/lib/table/_table-theme.scss#L6-L23)).

Vous pouvez surcharger les palettes de premier et d'arrière plan [proposées par Angular Material](https://github.com/angular/material2/blob/5.0.3/src/lib/core/theming/_palette.scss#L644-L714) en déclarant de nouvelles variables (type *map*) :

```scss
// File: src/theming/THEMENAME/config/_palette.scss

// Palette des couleurs d'arrière plan spécifique au thème clair.
$gl-light-theme-background: (
  // surchage d'une clé existante
  card: #f0f0f0,

  // spécifiques
  actived-navigation: #f0f0f0,
  form: rgba(220, 220, 220, 0.4),
  table-header: #d3d3d3,
);

// Palette des couleurs de premier plan spécifique au thème clair.
$gl-light-theme-foreground: (
  // spécifiques
  valid:   #4caf50,
  invalid: #d32f2f,
);
```

Puis appelez la fonction `app-override-theme()` pour enrichir la *map* retournée par les fonctions `mat-light-theme()` ou `mat-light-theme()` à l'aide de vos nouvelles variables :

```scss
// File: src/theming/THEMENAME/THEMENAME.scss

// Charger les outils d'aide à la création de thèmes du projet.
@import '../theming';

// Charger les variables et les palettes du thème.
@import "config/variables";

// Exposer une variable globale de thème.
$gl-theme: app-override-theme(
  mat-light-theme($gl-theme-primary, $gl-theme-accent, $gl-theme-warn),
  $foreground: $gl-light-theme-foreground,
  $background: $gl-light-theme-background
);
```

## Utiliser un thème alternatif

Un thème alternatif pourra être utilisé à l'intérieur d'un scope spécifique tel qu'une classe CSS :

```scss
// File: src/theme.scss

// ...

// Charger le thème alternatif "cleverage".
@import 'theming/cleverage/cleverage';

// Ajoutez la classe "ca-theme" au body pour appliquer le thème alternatif.
.ca-theme {
  @include angular-material-theme($ca-theme);
  @include app-theme($ca-theme);
}
```


[Angular Material]: https://material.angular.io/
