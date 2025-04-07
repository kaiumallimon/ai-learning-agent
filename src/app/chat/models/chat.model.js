class ChatMessage {
    constructor({ id, session_id, role, content, created_at }) {
      this.id = id;
      this.sessionId = session_id;
      this.role = role;
      this.content = content;
      this.createdAt = new Date(created_at);
    }
  
    toJSON() {
      return {
        id: this.id,
        sessionId: this.sessionId,
        role: this.role,
        content: this.content,
        createdAt: this.createdAt.toISOString()
      };
    }
  }
  
  module.exports = ChatMessage;