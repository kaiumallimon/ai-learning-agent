# AI-Learning Agent


<!-- ## System Architecture -->
### High-Level Architecture

1. **Backend:** Node.js server with Express/Fastify

2. **AI Layer:** LangChain for agent orchestration

3. **Database:** Supabase PostgreSQL for structured data (users, agents, chats), Supabase Vector for embeddings (or Pinecone/Weaviate alternative)

4. **Storage:** Supabase Storage for PDFs/documents

5. **Auth:** Supabase Auth

### Core Components
1. **Agent Template System**

    - Admin-defined templates with configurable tools, prompts, and tasks

2. **Conversation Management**

    - Chat history storage with context window

    - Long-term memory system

3. **Document Processing**

    - PDF/text ingestion and vectorization

    - RAG (Retrieval-Augmented Generation) implementation

4. **Multi-tenancy**

    - Isolated agent instances per admin/organization