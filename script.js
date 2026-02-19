let isLoading = false;

async function sendMessage() {
  if (isLoading) return; // cegah spam
  isLoading = true;

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput.value })
    });

    const data = await response.json();
    addMessage(data.reply, "ai");

  } catch (error) {
    console.error(error);
  } finally {
    isLoading = false;
  }
}
