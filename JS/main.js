let app = new App(
    'map',
    [45.7578137, 4.8320114], 
    "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", 
    "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=17a48063730caa425f3a988c52e168ce3bf63007");
let timer = new Timer("timer");

