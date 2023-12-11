<div><slot /></div>

<style lang="scss">
  div {
    display: inline-block;
    flex: 0 0 100%;
    padding: 4px;
    white-space: normal;
  }

  @include sm {
    div {
      flex-basis: 50%;
    }
  }

  @include lg {
    div {
      flex-basis: calc(100% / 3);
    }
  }

  @include xl {
    div {
      flex-basis: 25%;
    }
  }
</style>
