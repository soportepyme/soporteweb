{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [ pkgs.nodejs_20 ];
  env = {
    VITE_API_KEY = "AIzaSyD72gsM6DEsWlhAEFp-tm1MlKrA_BenKiM";
    VITE_AUTH_DOMAIN = "mecanicaportales-58f98.firebaseapp.com";
    VITE_PROJECT_ID = "mecanicaportales-58f98";
    VITE_STORAGE_BUCKET = "mecanicaportales-58f98.appspot.com";
    VITE_MESSAGING_SENDER_ID = "868413391418";
    VITE_APP_ID = "1:868413391418:web:1740f74c6cf627ebebab03";
  };
  idx = {
    extensions = [ 
      "dbaeumer.vscode-eslint"
    ];
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {
        dev-server = "npm run dev";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
