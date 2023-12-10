<div><slot /></div>

<style lang="scss">
  div {
    display: inline-block;
    width: 100%;
    padding: 4px;
    white-space: normal;
  }

  @include sm {
    div {
      width: 50%;
    }
  }

  @include lg {
    div {
      width: calc(100% / 3);
    }
  }

  @include xl {
    div {
      width: 25%;
    }
  }
</style>
