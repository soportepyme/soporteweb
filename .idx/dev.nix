{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [ pkgs.nodejs_20 ];
  idx = {
    extensions = [ 
      "dbaeumer.vscode-eslint"
      "google.gemini-cli-vscode-ide-companion"
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
