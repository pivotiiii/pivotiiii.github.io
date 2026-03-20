<script lang="ts">
  import {FeedbackType} from "./types";

  interface FeedbackPinProps {
    type: FeedbackType;
    onTypeChange: (type: FeedbackType) => void;
  }

  let {type = $bindable<FeedbackType>(FeedbackType.Empty), onTypeChange}: FeedbackPinProps = $props();

  function cycleFeedback() {
    if (type === FeedbackType.Empty) {
      type = FeedbackType.WrongPosition;
    } else if (type === FeedbackType.WrongPosition) {
      type = FeedbackType.Correct;
    } else {
      type = FeedbackType.Empty;
    }
    onTypeChange(type);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={cycleFeedback}
  class={"feedback_pin " +
    (type === FeedbackType.Correct
      ? "correct"
      : type === FeedbackType.WrongPosition
        ? "wrong-position"
        : "empty")}
></div>

<style>
  .feedback_pin {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border-color: black;
    border-width: 1px;
    border-style: solid;
  }

  .correct {
    background-color: red;
  }

  .wrong-position {
    background-color: white;
  }

  .empty {
    background-color: gray;
  }
</style>
