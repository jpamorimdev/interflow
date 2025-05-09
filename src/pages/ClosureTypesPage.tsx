import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { TypeForm } from '../components/closureTypes/TypeForm';
import { TypeList } from '../components/closureTypes/TypeList';
import { createClosureType, updateClosureType, deleteClosureType } from '../services/closureTypeService';
import { useAuthContext } from '../contexts/AuthContext';
import { ClosureType } from '../types/database';
import { useClosureTypes } from '../hooks/useQueryes';
import { useQueryClient } from '@tanstack/react-query';

// Definir um tipo que corresponda ao esperado pelo TypeForm e pelo serviço
type ClosureTypeFormValues = {
  title: string;
  color: string;
  flow_id?: string | null;
  organization_id?: string;
};

export function ClosureTypesPage() {
  const { t } = useTranslation('closureTypes');
  const { currentOrganizationMember } = useAuthContext();
  const [selectedType, setSelectedType] = useState<ClosureType | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Usar o hook useClosureTypes para buscar os tipos de encerramento
  const { data: types = [], isLoading: loading } = useClosureTypes(currentOrganizationMember?.organization.id);
  
  // Obter o queryClient para invalidar consultas
  const queryClient = useQueryClient();

  const handleSubmit = async (values: ClosureTypeFormValues) => {
    try {
      // Garantir que organization_id esteja definido
      const dataToSubmit = {
        ...values,
        organization_id: currentOrganizationMember?.organization.id,
        // Garantir que flow_id seja uma string ou null, não undefined
        flow_id: values.flow_id || null
      };
      
      if (selectedType?.id) {
        // Usar um tipo mais específico
        await updateClosureType(selectedType.id, dataToSubmit as Partial<ClosureType>);
      } else {
        // Usar um tipo mais específico
        await createClosureType(dataToSubmit as Omit<ClosureType, 'id' | 'created_at'>);
      }
      
      // Invalidar a consulta para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['closure_types', currentOrganizationMember?.organization.id] });
      
      setShowForm(false);
      setSelectedType(null);
    } catch (error) {
      console.error('Error saving type:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClosureType(id);
      
      // Invalidar a consulta para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['closure_types', currentOrganizationMember?.organization.id] });
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Button onClick={() => setShowForm(true)}>
          {t('newType')}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t('loading')}...
        </div>
      ) : (
        <TypeList
          types={types}
          onEdit={(type) => {
            setSelectedType(type);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedType(null);
        }}
        title={selectedType ? t('editType') : t('newType')}
      >
        <TypeForm
          initialValues={selectedType || undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
} 