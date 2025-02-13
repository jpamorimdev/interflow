import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquareText, Plus, Loader2, X, AlertTriangle } from 'lucide-react';
import { useOrganization } from '../hooks/useOrganization';
import { supabase } from '../lib/supabase';
import { PromptForm } from '../components/prompts/PromptForm';

interface Prompt {
  id: string;
  organization_id: string;
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export default function Prompts() {
  const { t } = useTranslation(['prompts', 'common']);
  const { currentOrganization } = useOrganization();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    tags: [] as string[]
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentOrganization) {
      loadPrompts();
    }
  }, [currentOrganization]);

  async function loadPrompts() {
    if (!currentOrganization) return;

    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('organization_id', currentOrganization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error loading prompts:', error);
      setError(t('common:error'));
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) return;

    setSaving(true);
    setError('');

    try {
      const { error } = await supabase
        .from('prompts')
        .insert([{
          organization_id: currentOrganization.id,
          title: formData.title,
          content: formData.content,
          description: formData.description || null,
          tags: formData.tags
        }]);

      if (error) throw error;

      await loadPrompts();
      setShowAddModal(false);
      setFormData({ title: '', content: '', description: '', tags: [] });
    } catch (error) {
      console.error('Error adding prompt:', error);
      setError(t('common:error'));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization || !selectedPrompt) return;

    setSaving(true);
    setError('');

    try {
      const { error } = await supabase
        .from('prompts')
        .update({
          title: formData.title,
          content: formData.content,
          description: formData.description || null,
          tags: formData.tags,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPrompt.id);

      if (error) throw error;

      await loadPrompts();
      setShowEditModal(false);
      setSelectedPrompt(null);
      setFormData({ title: '', content: '', description: '', tags: [] });
    } catch (error) {
      console.error('Error updating prompt:', error);
      setError(t('common:error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (prompt: Prompt) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', prompt.id);

      if (error) throw error;

      await loadPrompts();
      setShowDeleteModal(false);
      setSelectedPrompt(null);
    } catch (error) {
      console.error('Error deleting prompt:', error);
      setError(t('common:error'));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <MessageSquareText className="w-6 h-6 mr-2" />
          {t('prompts:title')}
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('prompts:add')}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {prompt.title}
                </h3>
                {prompt.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {prompt.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setFormData({
                      title: prompt.title,
                      content: prompt.content,
                      description: prompt.description || '',
                      tags: prompt.tags || []
                    });
                    setShowEditModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t('prompts:edit')}
                </button>
                <button
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  {t('prompts:delete')}
                </button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <pre className="text-sm bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                {prompt.content}
              </pre>
            </div>

            {prompt.tags && prompt.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {prompt.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t('prompts:lastUpdated')}: {new Date(prompt.updated_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {showAddModal ? t('prompts:add') : t('prompts:edit')}
              </h3>
              <button
                onClick={() => {
                  showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                  setSelectedPrompt(null);
                  setFormData({ title: '', content: '', description: '', tags: [] });
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <PromptForm
                formData={formData}
                onChange={setFormData}
                onSubmit={showAddModal ? handleAdd : handleEdit}
                onCancel={() => {
                  showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                  setSelectedPrompt(null);
                  setFormData({ title: '', content: '', description: '', tags: [] });
                }}
                saving={saving}
                error={error}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPrompt && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/50 rounded-full mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
                {t('prompts:deleteTitle')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                {t('prompts:deleteConfirmation', { name: selectedPrompt.title })}
                <br />
                {t('prompts:deleteWarning')}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedPrompt(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t('common:back')}
                </button>
                <button
                  onClick={() => handleDelete(selectedPrompt)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t('common:confirmDelete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}