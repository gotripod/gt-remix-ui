{
  description = "Run 'nix develop' to have a dev shell that has everything this project needs";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      nixpkgs-unstable,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pkgs-unstable = nixpkgs-unstable.legacyPackages.${system};
        fhs = pkgs.buildFHSUserEnv {
          name = "fhs-shell";
          targetPkgs = pkgs: [
            pkgs.nodejs_20
            pkgs-unstable.aider-chat
          ];
        };
      in
      {
        devShell = fhs.env;
      }
    );
}
