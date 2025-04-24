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
        <h5 class="mb-0">{{ $t("AIChatButton.chatHeader") }}</h5>
      </div>
      <div class="chat-messages" ref="messageContainer">
        <div class="message-list">
          <!-- Messages -->
          <div v-for="(msg, index) in messages" :key="index" class="row mb-2">
            <div
              :class="
                msg.from === 'user'
                  ? 'offset-6 col-6 text-end'
                  : 'col-6 text-start'
              "
            >
              <span
                :class="
                  msg.from === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white text-black'
                "
                class="d-inline-block p-2 rounded"
                v-html="formatMessage(msg.text)"
              ></span>
            </div>
          </div>
        </div>
        <span v-if="isLoading" class="spinner-border spinner-border-lg"></span>
      </div>

      <div class="chat-input">
        <input
          type="text"
          class="form-control bg-white"
          :placeholder="$t('AIChatButton.askAI')"
          v-model="userInput"
          @keyup.enter="sendMessage2"
        />
        <button class="btn btn-primary btn-send" @click="sendMessage2">
          <i class="ri-send-plane-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";

const isOpen = ref(false);
const userInput = ref("");
const messages = ref([]);
const { $axios } = useNuxtApp();
const isLoading = ref(false);

const OPENROUTER_API_KEY =
  "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";

const MODEL_NAME = "deepseek/deepseek-chat-v3-0324:free";
// const MODEL_NAME = "deepseek-chat:free";
// const MODEL_NAME = "mistralai/mistral-7b-instruct:free"; //nhanh ok nè mà hơi ngu

// const MODEL_NAME = "google/gemini-pro:free";
// const MODEL_NAME = "openai/gpt-3.5-turbo:free";
// const MODEL_NAME = "huggingface/gpt2-small:free";
// const MODEL_NAME = "anthropic/claude-instant-1:free";
// const MODEL_NAME = "mistralai/mixtral-8x7b";
// const MODEL_NAME = "qwen/qwen-32b-chat";
// const MODEL_NAME = "meta-llama/llama-3-8b-instruct";
// const MODEL_NAME = "google/gemini-1.5-flash";
// const MODEL_NAME = "google/gemini-2.5-pro-exp-03-25:free";

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

function formatMessage(text) {
  // Format markdown đơn giản: **bold** và xuống dòng
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

// const sendMessage = async () => {
//   const question = userInput.value.trim();
//   if (!question) return;

//   messages.value.push({ from: "user", text: question });
//   userInput.value = "";

//   isLoading.value = true; // 👉 Start loading
//   try {
//     const dbMetadata = await $axios.get("/api/db-metadata/");
//     console.log("dbMetadata", dbMetadata.data);

//     const deepSeekRes = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: MODEL_NAME,
//           messages: [
//             {
//               role: "system",
//               content: `Bạn là một trợ lý dữ liệu.
//               Dưới đây là metadata của database dưới dạng JSON:\n\n
//               ${JSON.stringify(dbMetadata, null, 2)}`,
//             },
//             {
//               role: "user",
//               content: `Dựa vào metadata trên,
//               hãy xử lý câu hỏi sau theo quy tắc sau:
//                 - Nếu câu hỏi yêu cầu truy vấn dữ liệu từ các bảng để có câu trả lời, trả về tên bảng theo định dạng: true table1 table2 ... (không giải thích gì thêm).
//                 - Nếu câu hỏi không cần dữ liệu từ bảng (chỉ cần kiến thức thông thường), trả về theo định dạng: false câu trả lời
//               Câu hỏi: "${question}"`,
//             },
//           ],
//           temperature: 0.2,
//         }),
//       }
//     );

//     const result = await deepSeekRes.json();
//     const answer =
//       result.choices?.[0]?.message?.content ?? "Không có phản hồi.";

//     console.log("answer: ", answer);

//     if (answer.startsWith("false")) {
//       const reply = answer.replace("false", "").trim();
//       messages.value.push({ from: "ai", text: reply });
//     } else if (answer.startsWith("true")) {
//       const tables = answer.replace("true", "").trim().split(" ");
//       console.log("Cần lấy data từ các bảng:", tables);
//       await handleAnswerWithTables(tables, question);
//     } else {
//       messages.value.push({ from: "ai", text: answer });
//     }
//   } catch (err) {
//     console.error(err);
//     messages.value.push({
//       from: "ai",
//       text: "Đã xảy ra lỗi khi gọi AI hoặc API Django.",
//     });
//   } finally {
//     isLoading.value = false; // 👉 End loading
//   }
// };

// const handleAnswerWithTables = async (tables, question) => {
//   try {
//     const response = await $axios.get("/api/multi-table-data/", {
//       params: { tables: tables.join(",") },
//     });

//     const tableData = response.data;

//     const deepSeekWithData = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: MODEL_NAME,
//           messages: [
//             {
//               role: "system",
//               content: `Bạn là một trợ lý dữ liệu. Dưới đây là dữ liệu thực tế từ các bảng:\n\n
//               ${JSON.stringify(tableData, null, 2)}`,
//             },
//             {
//               role: "user",
//               content: `Dựa vào dữ liệu trên, hãy trả lời câu hỏi sau: "${question}"`,
//             },
//           ],
//           temperature: 0.2,
//         }),
//       }
//     );

//     const resultWithData = await deepSeekWithData.json();
//     const finalAnswer =
//       resultWithData.choices?.[0]?.message?.content ?? "Không có phản hồi.";
//     messages.value.push({ from: "ai", text: finalAnswer });
//   } catch (error) {
//     console.error("Lỗi khi xử lý dữ liệu:", error);
//     messages.value.push({
//       from: "ai",
//       text: "Đã xảy ra lỗi khi truy vấn dữ liệu hoặc gọi lại AI.",
//     });
//   } finally {
//     isLoading.value = false; // 👉 Kết thúc loading ở đây luôn
//   }
// };

const sendMessage2 = async () => {
  const question = userInput.value.trim();
  if (!question) return;

  messages.value.push({ from: "user", text: question });
  userInput.value = "";

  isLoading.value = true;
  try {
    const response = await $axios.get("/api/multi-table-data/", {
      params: { tables: "albums_album,artists_artist,tracks_track" },
    });

    const tableData = response.data;
    console.log("tableData: ", tableData);

    const deepSeekWithData = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: "system",
              content: `
              Bạn là một trợ lý chatbot AI cho 1 website nghe nhạc. 
              Nhiệm vụ của bạn là hỗ trợ trả lời các câu hỏi của người 
              sử dụng website này dựa vào dữ liệu được cung cấp.
              Dưới đây là dữ liệu thực tế từ các bảng:\n\n
              ${JSON.stringify(tableData, null, 2)}`,
            },
            {
              role: "user",
              content: `Dựa vào dữ liệu trên, hãy trả lời câu hỏi sau: "${question}"`,
            },
          ],
          temperature: 0.2,
        }),
      }
    );

    const resultWithData = await deepSeekWithData.json();
    const finalAnswer =
      resultWithData.choices?.[0]?.message?.content ?? "Không có phản hồi.";
    messages.value.push({ from: "ai", text: finalAnswer });
  } catch (error) {
    console.error("Lỗi khi xử lý dữ liệu:", error);
    messages.value.push({
      from: "ai",
      text: "Đã xảy ra lỗi khi truy vấn dữ liệu hoặc gọi lại AI.",
    });
  } finally {
    isLoading.value = false;
  }
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
  width: 600px;
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
