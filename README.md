# ddc-source-nvim-lua

Neovim Lua completion for ddc.vim

This source collects items from neovim Lua modules. It is useful for Lua
completion.

## Required

### Neovim

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
call ddc#custom#patch_filetype('lua', 'sources', ['nvim-lua'])

call ddc#custom#patch_global('sourceOptions', #{
      \   nvim-lua: #{
      \     mark: 'lua',
      \   }
      \ })
```
