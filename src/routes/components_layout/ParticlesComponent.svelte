<script lang="ts">
  const {color} = $props();
</script>

<div class="particlesContainer {color}">
  {#each Array(30)}
    <div class="particle"></div>
  {/each}
</div>

<style lang="scss">
  @use "sass:math";

  .particlesContainer > * {
    background: #036a6a;
  }

  .pink.particlesContainer > * {
    background: #f42c6f;
  }

  .particle {
    position: fixed;
    border-radius: 50%;
    z-index: -1;
    filter: blur(0.45em);
    transition: background-color 1000ms linear;
    -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
  }

  @media (min-width: 0px) {
    .particle {
      display: none;
    }
  }
  @media (min-width: 750px) {
    .particle {
      display: inline;
    }
  }

  .particle {
    @for $i from 1 through 30 {
      &:nth-child(#{$i}) {
        @keyframes particle-animation-#{$i} {
          100% {
            transform: translate3d(
              (math.random(90) * 1vw - 25vw),
              (math.random(90) * 1vh),
              (math.random(100) * 1px)
            );
          }
        }

        animation: particle-animation-#{$i} 60s alternate infinite;
        $size: math.random(75) + 5 + px;
        opacity: math.div(math.random(100), 100);
        height: $size;
        width: $size;
        animation-delay: -#{$i * 0.2}s;
        transform: translate3d(
          (math.random(90) * 1vw - 25vw),
          (math.random(90) * 1vh),
          (math.random(100) * 4px)
        );
      }
    }
  }
</style>
