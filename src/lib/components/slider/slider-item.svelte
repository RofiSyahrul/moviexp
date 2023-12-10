<div><slot /></div>

<style lang="scss">
  div {
    display: inline-block;
    width: 50%;
    padding: 4px;
    white-space: normal;
  }

  @include lg {
    div {
      width: 25%;
    }
  }
</style>
