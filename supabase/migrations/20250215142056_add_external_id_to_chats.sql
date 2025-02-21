-- Adiciona coluna external_id para referência externa
ALTER TABLE chats ADD COLUMN external_id TEXT;

-- Cria índice composto para melhorar performance de consultas
-- que filtram por channel_id e external_id simultaneamente
CREATE INDEX chats_channel_external_idx ON chats(channel_id, external_id);

-- Garante que a combinação de channel_id e external_id seja única
ALTER TABLE chats ADD CONSTRAINT chats_channel_external_unique UNIQUE (channel_id, external_id); 

-- Remove a coluna channel que não será mais utilizada
ALTER TABLE chats DROP COLUMN channel; 

-- Adiciona coluna external_id para referência externa em messages
ALTER TABLE messages ADD COLUMN external_id TEXT;
-- Adiciona coluna response_message_id que referencia outra mensagem
ALTER TABLE messages ADD COLUMN response_message_id UUID REFERENCES messages(id);
-- Adiciona coluna metadata para armazenar dados adicionais da mensagem
ALTER TABLE messages ADD COLUMN metadata JSONB;

-- Cria índice composto para melhorar performance de consultas
-- que filtram por chat_id e external_id simultaneamente
CREATE INDEX messages_chat_external_idx ON messages(chat_id, external_id);
-- Cria índice para melhorar performance de consultas que usam response_message_id
CREATE INDEX messages_response_idx ON messages(response_message_id);
-- Cria índice GIN para permitir buscas eficientes dentro do JSONB
CREATE INDEX messages_metadata_idx ON messages USING GIN (metadata);

-- Adiciona coluna profile_picture para armazenar URL da imagem de perfil
ALTER TABLE chats ADD COLUMN profile_picture TEXT;

-- Adiciona coluna profile_picture para armazenar URL da imagem de perfil em customers
ALTER TABLE customers ADD COLUMN profile_picture TEXT;
