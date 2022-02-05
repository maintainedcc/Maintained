
<div class="group">
  <div class="editor">
    <input type="text" name="" id="" placeholder="Badge Content">
    <input type="text" name="" id="" placeholder="Badge Content">
    <button>+3</button>
  </div>
  <div class="controls">
    <button>S</button>
    <button>C</button>
    <button>O</button>
  </div>
</div>

<style lang="scss">
  .group {
    column-gap: 30px;
    justify-content: space-between;
  }

  .group, .editor, .controls {
    display: flex;
    align-items: center;
  }

  .editor {
    flex: 1 1;
  }

  input {
    background-color: #000;
    border: none;
    color: #fff;
    font-family: inherit;
    font-size: 0.7rem;
    flex: 1 1;
    margin: 0;
    padding: 12px 20px;
  }

  button {
    background-color: #000;
    border: none;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.7rem;
    font-weight: bold;
    margin: 0;
    padding: 12px;
    width: 45px;
  }

  input:first-child, button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  input:last-child, button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>