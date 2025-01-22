# bip322.rs

The [bip322.rs](https://bip322.rs) site runs a small WASM binary of the 
[bip322](https://github.com/rust-bitcoin/bip322) rust crate.

## Compile for WASM (on MacOs)

```
brew install llvm
cargo install wasm-pack
rustup target add wasm32-unknown-unknown
AR=/opt/homebrew/opt/llvm/bin/llvm-ar \
CC=/opt/homebrew/opt/llvm/bin/clang \
wasm-pack build \
    --target web \
    --out-name bip322 \
    verify
```

The WASM binary and Javascript glue code can then be found in `verify/pkg`. 
