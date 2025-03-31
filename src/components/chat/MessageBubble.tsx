import React, { useState } from 'react';
import { MessageStatus } from './MessageStatus';
import { FileText, UserPlus, UserMinus, UserCog, CheckCircle, MessageSquare, MoreVertical, Reply, X, Info, ChevronRight, ChevronDown, MoreHorizontal, Trash2, Loader2 } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { Message } from '../../types/database';
import { useTranslation } from 'react-i18next';
import { MarkdownRenderer } from '../ui/MarkdownRenderer';
import './styles.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../../components/ui/Dialog";
import { Button } from "../../components/ui/Button";

// Interface para configurações de funcionalidades por canal
interface ChannelFeatures {
  canReplyToMessages: boolean;
  canSendAudio: boolean;
  canSendTemplates: boolean;
  has24HourWindow: boolean;
  canSendAfter24Hours: boolean;
  canDeleteMessages: boolean;
}

interface MessageBubbleProps {
  message: Message
  chatStatus: string;
  onReply?: (message: Message) => void;
  isHighlighted?: boolean;
  channelFeatures?: ChannelFeatures;
  onDeleteMessage?: (message: Message) => void;
}

export function MessageBubble({ 
  message, 
  chatStatus, 
  onReply, 
  isHighlighted = false,
  channelFeatures = {
    canReplyToMessages: true,
    canSendAudio: false,
    canSendTemplates: false,
    has24HourWindow: false,
    canSendAfter24Hours: true,
    canDeleteMessages: false
  },
  onDeleteMessage
}: MessageBubbleProps) {
  const { t } = useTranslation('chats');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [expandedMetadataKeys, setExpandedMetadataKeys] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    content,
    created_at,
    sender_type,
    status,
    error_message,
    attachments,
    type,
    sender_agent
  } = message;
  
  const isAgent = sender_type === 'agent';
  const isSystem = sender_type === 'system';
  const isCustomer = sender_type === 'customer';

  const handleReply = () => {
    if (onReply) {
      onReply(message);
    }
  };

  const handleDelete = async () => {
    if (!onDeleteMessage) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await onDeleteMessage(message);
      setShowDeleteModal(false);
    } catch (err) {
      setError(t("errors.deleteMessage"));
      console.error("Erro ao excluir mensagem:", err);
      // Não fechar o modal em caso de erro
    } finally {
      setIsDeleting(false);
    }
  };

  // Função para formatar data e hora
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Função para renderizar o valor do metadata de forma amigável
  const renderMetadataValue = (value: unknown, depth = 0, path = ''): React.ReactNode => {
    if (value === null) return <span className="text-gray-500 dark:text-gray-400">null</span>;
    if (value === undefined) return <span className="text-gray-500 dark:text-gray-400">undefined</span>;
    
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) return <span className="text-gray-500 dark:text-gray-400">[]</span>;
        
        const isExpanded = expandedMetadataKeys.includes(path);
        
        return (
          <div className="ml-4">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => toggleMetadataExpand(path)}
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" /> : 
                <ChevronRight className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              }
              <span className="text-blue-600 dark:text-blue-400">Array[{value.length}]</span>
            </div>
            
            {isExpanded && (
              <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 pl-2">
                {value.map((item, index) => (
                  <div key={index} className="my-1">
                    <span className="text-gray-600 dark:text-gray-300">{index}: </span>
                    {renderMetadataValue(item, depth + 1, `${path}.${index}`)}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      } else {
        const entries = Object.entries(value);
        if (entries.length === 0) return <span className="text-gray-500 dark:text-gray-400">{"{}"}</span>;
        
        const isExpanded = expandedMetadataKeys.includes(path);
        
        return (
          <div className="ml-4">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => toggleMetadataExpand(path)}
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" /> : 
                <ChevronRight className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              }
              <span className="text-blue-600 dark:text-blue-400">Object{`{${entries.length}}`}</span>
            </div>
            
            {isExpanded && (
              <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 pl-2">
                {entries.map(([key, val]) => (
                  <div key={key} className="my-1">
                    <span className="text-gray-600 dark:text-gray-300">{key}: </span>
                    {renderMetadataValue(val, depth + 1, `${path}.${key}`)}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
    }
    
    if (typeof value === 'string') {
      // Verificar se é uma URL
      if (/^https?:\/\//.test(value)) {
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 underline hover:opacity-80 break-all"
          >
            {value}
          </a>
        );
      }
      
      // Verificar se é uma data ISO
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return <span className="text-green-600 dark:text-green-400">{date.toLocaleString()}</span>;
        }
      }
      
      return <span className="text-green-600 dark:text-green-400">"{value}"</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="text-purple-600 dark:text-purple-400">{value}</span>;
    }
    
    if (typeof value === 'boolean') {
      return <span className="text-orange-600 dark:text-orange-400">{value.toString()}</span>;
    }
    
    return <span>{String(value)}</span>;
  };

  // Função para alternar a expansão de um nó do metadata
  const toggleMetadataExpand = (path: string) => {
    setExpandedMetadataKeys(prev => 
      prev.includes(path) 
        ? prev.filter(key => key !== path)
        : [...prev, path]
    );
  };

  // Função para renderizar ícone do sistema
  const renderSystemIcon = () => {
    switch (type) {
      case 'user_start':
        return <MessageSquare className="w-4 h-4" />;
      case 'user_entered':
        return <UserPlus className="w-4 h-4" />;
      case 'user_left':
        return <UserMinus className="w-4 h-4" />;
      case 'user_transferred':
        return <UserCog className="w-4 h-4" />;
      case 'user_join':
        return <UserPlus className="w-4 h-4" />;
      case 'user_closed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Função para obter a mensagem do sistema
  const getSystemMessage = () => {
    const agentName = sender_agent?.full_name || t('unnamed');
    
    switch (type) {
      case 'user_start':
        return t('systemMessages.userStart', { name: agentName });
      case 'user_entered':
        return t('systemMessages.userEntered', { name: agentName });
      case 'user_left':
        return t('systemMessages.userLeft', { name: agentName });
      case 'user_transferred':
        return t('systemMessages.userTransfer', { name: agentName });
      case 'user_join':
        return t('systemMessages.userJoin', { name: agentName });
      case 'user_closed':
        return t('systemMessages.userClosed', { name: agentName });
      default:
        return content;
    }
  };

  // Função para renderizar anexos
  const renderAttachment = (attachment: { url: string; type: string; name: string }) => {
    if (attachment.type.startsWith('image') || attachment.type.startsWith('image/')) {
      return (
        <div className="mt-2 max-w-full">
          <div 
            onClick={() => {
              setSelectedImage(attachment);
              setImageModalOpen(true);
            }}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={attachment.url}
              alt={attachment.name}
              className="max-w-full w-auto rounded-lg h-[200px] object-contain"
            />
          </div>
        </div>
      );
    }

    if (attachment.type.startsWith('audio') || attachment.type.startsWith('audio/')) {
      return (
        <div className="w-[300px]">
          <div className="bg-gray-200 dark:bg-gray-800/50 rounded-full p-2">
            <AudioPlayer
              src={attachment.url}
              fileName={attachment.name}
            />
          </div>
          {content && (
            <div className="mt-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {t('voice.transcription')}:
              </span>
              <div className="mt-1 text-sm">
                {content}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mt-2 max-w-full">
        <a
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FileText className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
            {attachment.name}
          </span>
        </a>
      </div>
    );
  };

  // Renderização condicional baseada no tipo de mensagem
  let messageContent;
  
  if (isSystem) {
    messageContent = (
      <div className="flex justify-center my-2 relative group">
        <div className={`flex items-center flex-row gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 ${
          isHighlighted ? 'ring-2 ring-blue-500 dark:ring-blue-400 animate-pulse' : ''
        }`}>
          {renderSystemIcon()}
          <span className=''>{getSystemMessage()}</span>
          <span className="text-xs text-gray-500">
            {new Date(created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <div className="absolute right-0 top-0 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {chatStatus === 'in_progress' && channelFeatures.canReplyToMessages && onReply && (
                  <DropdownMenuItem onClick={handleReply}>
                    <Reply className="w-4 h-4 mr-2" />
                    {t('actions.reply')}
                  </DropdownMenuItem>
                )}
                {channelFeatures.canDeleteMessages && onDeleteMessage && (
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteModal(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('actions.delete')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => setDetailsModalOpen(true)}>
                  <Info className="w-4 h-4 mr-2" />
                  {t('actions.details')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  } else {
    messageContent = (
      <div 
        id={`message-${message.id}`}
        className={`flex ${isAgent ? 'justify-end' : 'justify-start'} group relative w-full ${isHighlighted ? 'highlighted-message' : ''}`}
        onDoubleClick={handleReply}
      >
        <div
          className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] rounded-lg p-3 relative overflow-hidden ${
            isAgent
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          {message.response_to && (
            <button 
              onClick={() => {
                // Encontrar e rolar até a mensagem original
                const element = document.getElementById(`message-${message.response_to?.id}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Adicionar um highlight temporário
                element?.classList.add('highlight-message');
                setTimeout(() => element?.classList.remove('highlight-message'), 2000);
              }}
              className={`
                mb-2 text-sm rounded-md p-2 w-full max-w-full text-left
                hover:opacity-90 transition-opacity cursor-pointer overflow-hidden overflow-wrap-anywhere
                ${isAgent 
                  ? 'bg-blue-700/60 text-blue-100' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              <div className="font-medium flex items-center gap-1">
                <span className="text-xs px-2 py-0.5 rounded bg-opacity-20 bg-white ">
                  {message.response_to.sender_type === 'agent' ? t('you') : t('customer')}:
                </span>
              </div>
              <div className="truncate mt-1 overflow-wrap-anywhere">
                {message.response_to.content}
              </div>
            </button>
          )}
          
          {/* Dropdown Menu */}
          <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity ${
            isCustomer ? 'right-0 mr-1 mt-1' : 'right-0 mr-1 mt-1'
          }`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side={isCustomer ? "right" : "left"}
              >
                {chatStatus === 'in_progress' && channelFeatures.canReplyToMessages && onReply && (
                  <DropdownMenuItem onClick={handleReply}>
                    <Reply className="w-4 h-4 mr-2" />
                    {t('actions.reply')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => setDetailsModalOpen(true)}>
                  <Info className="w-4 h-4 mr-2" />
                  {t('actions.details')}
                </DropdownMenuItem>
                {channelFeatures.canDeleteMessages && onDeleteMessage && (
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteModal(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('actions.delete')}
                  </DropdownMenuItem>
                )}
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-3">
            {attachments?.map((attachment, index) => (
              <div key={index} className="max-w-full overflow-hidden">
                {renderAttachment(attachment)}
              </div>
            ))}

            {/* Existing message content */}
            {content && !attachments?.some(attachment => 
              attachment.type.startsWith('audio') || attachment.type.startsWith('audio/')
            ) && (
              <MarkdownRenderer content={content} />
            )}
          </div>

          <div className={`flex items-center justify-end space-x-1 text-xs mt-1 ${
            isAgent
              ? 'text-blue-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            <span>{new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {isAgent && status && (
              <MessageStatus 
                status={status} 
                errorMessage={error_message}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {messageContent}

      {/* Modal de imagem - compartilhado */}
      {imageModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
            <button 
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setImageModalOpen(false);
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.name} 
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="text-white text-center mt-2">{selectedImage.name}</div>
          </div>
        </div>
      )}

      {/* Modal de detalhes da mensagem - compartilhado */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">{t('messageDetails.title')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.id')}:</div>
              <div className="break-all text-gray-900 dark:text-gray-100">{message.id}</div>
              
              <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.type')}:</div>
              <div className="text-gray-900 dark:text-gray-100">{message.type}</div>
              
              <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.senderType')}:</div>
              <div className="text-gray-900 dark:text-gray-100">{message.sender_type}</div>
              
              <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.status')}:</div>
              <div className="text-gray-900 dark:text-gray-100">{message.status || '-'}</div>
              
              <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.createdAt')}:</div>
              <div className="text-gray-900 dark:text-gray-100">{formatDateTime(message.created_at)}</div>
              
              {message.sender_agent && (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.sentBy')}:</div>
                  <div className="text-gray-900 dark:text-gray-100">{message.sender_agent.full_name}</div>
                </>
              )}
              
              {message.external_id && (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.externalId')}:</div>
                  <div className="break-all text-gray-900 dark:text-gray-100">{message.external_id}</div>
                </>
              )}
              
              {message.session_id && (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.sessionId')}:</div>
                  <div className="break-all text-gray-900 dark:text-gray-100">{message.session_id}</div>
                </>
              )}
              
              {message.response_message_id && (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.responseMessageId')}:</div>
                  <div className="break-all text-gray-900 dark:text-gray-100">{message.response_message_id}</div>
                </>
              )}
              
              {message.error_message && (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.errorMessage')}:</div>
                  <div className="text-red-500 dark:text-red-400">{message.error_message}</div>
                </>
              )}
            </div>
            
            {message.content && (
              <div className="space-y-1">
                <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.content')}:</div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
                  {message.content}
                </div>
              </div>
            )}
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-2">
                <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.attachments')}:</div>
                <div className="space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                      <div><span className="font-medium text-gray-700 dark:text-gray-300">{t('messageDetails.name')}:</span> <span className="text-gray-900 dark:text-gray-100">{attachment.name}</span></div>
                      <div><span className="font-medium text-gray-700 dark:text-gray-300">{t('messageDetails.type')}:</span> <span className="text-gray-900 dark:text-gray-100">{attachment.type}</span></div>
                      <div className="truncate"><span className="font-medium text-gray-700 dark:text-gray-300">{t('messageDetails.url')}:</span> <span className="text-gray-900 dark:text-gray-100">{attachment.url}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {message.metadata && Object.keys(message.metadata).length > 0 && (
              <div className="space-y-1">
                <div className="font-semibold text-gray-700 dark:text-gray-300">{t('messageDetails.metadata')}:</div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  {renderMetadataValue(message.metadata, 0, 'root')}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={(open) => {
        // Só permite fechar o modal se não estiver deletando
        if (!isDeleting) {
          setShowDeleteModal(open);
        }
      }}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              {t("deleteConfirmation.title")}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {t("deleteConfirmation.message")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">
                  {t("deleteConfirmation.warning")}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("deleteConfirmation.cancel")}
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 flex items-center"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("actions.deleting")}
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t("deleteConfirmation.confirm")}
                  </>
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}