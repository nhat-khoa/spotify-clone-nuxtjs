<template>
  <div class="ai-chat-button">
    <button
      class="chat-toggle-btn"
      @click="toggleChat"
      :class="{ 'is-active': isOpen }"
    >
      <i class="ri-robot-fill" v-if="!isOpen"></i>
      <i class="ri-close-fill" v-else></i>
    </button>

    <div class="chat-container" v-if="isOpen">
      <div class="chat-header">
        <h5 class="mb-0">AI Assistant</h5>
      </div>
      <div class="chat-messages" ref="messageContainer">
        <div class="message-list">
          <!-- Messages go here -->
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          class="form-control bg-white"
          placeholder="Hỏi AI..."
          v-model="userInput"
          @keyup.enter="sendMessage"
        />
        <button class="btn btn-primary btn-send" @click="sendMessage">
          <i class="ri-send-plane-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const userInput = ref("");

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (!userInput.value.trim()) return;

  // Xử lý gửi tin nhắn ở đây
  console.log("Sending message:", userInput.value);
  userInput.value = "";
};
</script>

<style scoped>
.ai-chat-button {
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bs-primary);
  border: none;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
}

.chat-container {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 15px;
  background: var(--bs-primary);
  color: white;
  border-radius: 12px 12px 0 0;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-input .form-control {
  flex: 1;
}

.btn-send {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
