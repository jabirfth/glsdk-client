# Theme

## Logo

 * Change your logo 
```
src/assets/img/logo.svg
```

## Styles 

 * Add new palette of color
 
 You can use http://mcg.mbitson.com/  for generate and export Angular2 Material palette code on this file 

 ```
 src/theming/_palette-custom.scss
 ```
 
 * Use this palette on ```src/theme.scss```

 ```
 @import 'theming/palette-custom';
 $app-theme-primary: mat-palette($md-custom);
 ```

 * Use theme color on component style ```src/app/my-component.scss```
 
 ```
 @import '../theme';
 
 
 .my-class {
  color: $app-primary;
 }
 ```
