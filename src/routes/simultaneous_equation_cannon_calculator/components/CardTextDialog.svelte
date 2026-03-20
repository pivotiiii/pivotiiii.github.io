<script lang="ts">
  let {showCardText = $bindable(false)} = $props();

  import cardImageMeta from "../assets/LEDE-EN080-664a92f0af.webp?w=400&format=webp&as=metadata&imagetools";
</script>

<dialog open>
  <article>
    <img
      src={cardImageMeta.src}
      alt="The Yu-Gi-Oh! trap card Simultaneous Equation Cannons."
      width={cardImageMeta.width}
      height={cardImageMeta.height}
      class="card-image"
    />
    <p class="card-description">
      Banish 1 Fusion Monster and 2 Xyz Monsters with the same Rank from your Extra Deck, whose combined Level
      and Ranks equal the total number of cards in both players' hands and on the field, then you can apply
      this effect.
      <br />● Return 2 of your banished monsters to the Extra Deck (1 Xyz and 1 Fusion) whose combined Level
      and Rank equal the Level or Rank of 1 face-up monster your opponent controls, then banish all cards they
      control.
    </p>
    <footer>
      <a
        role="button"
        aria-label="View Card on YGO DB"
        class="secondary view-on-db-button"
        href="https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=19921&request_locale=en"
      ></a>
      <button onclick={() => (showCardText = false)}> Close </button>
    </footer>
  </article>
</dialog>

<style>
  .card-image {
    border-radius: 2%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 5px;
    width: 45%;
  }

  .card-description {
    margin-top: 3%;
  }

  .view-on-db-button::after {
    content: "View on Yu-Gi-Oh! Card Database";
  }

  @media (max-width: 420px) {
    .view-on-db-button::after {
      content: "View on YGO DB";
    }
  }
</style>
