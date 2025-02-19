import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Plus, X, Clock, Variable, Type } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface Option {
  text: string;
}

interface InputNodeProps {
  data: {
    inputType: 'text' | 'options';
    options?: Option[];
    inputConfig?: {
      variableName: string;
      timeout: number;
      fallbackNodeId?: string;
    };
    variables: { id: string; name: string }[];
    removedHandles?: string[];
    label?: string;
  };
  isConnectable: boolean;
  id: string;
}

export function InputNode({ data, isConnectable, id }: InputNodeProps) {
  const { t } = useTranslation('flows');
  const [inputType, setInputType] = useState(data.inputType || 'text');
  const [options, setOptions] = useState<Option[]>(data.options || []);
  const [config, setConfig] = useState(data.inputConfig || {
    variableName: '',
    timeout: 5,
    fallbackNodeId: ''
  });
  const [hoveredHandle, setHoveredHandle] = useState<string | null>(null);

  const variables = data.variables || [];
  const removedHandles = data.removedHandles || [];

  const handleLabelChange = (newLabel: string) => {
    const event = new CustomEvent('nodeDataChanged', {
      detail: { nodeId: id, data: { ...data, label: newLabel } }
    });
    document.dispatchEvent(event);
  };

  const handleInputTypeChange = useCallback((value: 'text' | 'options') => {
    setInputType(value);
    const event = new CustomEvent('nodeDataChanged', {
      detail: { 
        nodeId: id, 
        data: { ...data, inputType: value } 
      }
    });
    document.dispatchEvent(event);
  }, [id, data]);

  const handleConfigChange = useCallback((updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    const event = new CustomEvent('nodeDataChanged', {
      detail: { 
        nodeId: id, 
        data: { ...data, inputConfig: newConfig } 
      }
    });
    document.dispatchEvent(event);
  }, [id, data, config]);

  const handleOptionsChange = useCallback((newOptions: Option[]) => {
    setOptions(newOptions);
    const event = new CustomEvent('nodeDataChanged', {
      detail: { 
        nodeId: id, 
        data: { ...data, options: newOptions } 
      }
    });
    document.dispatchEvent(event);
  }, [id, data]);

  const removeHandle = useCallback((handleId: string) => {
    const newRemovedHandles = [...removedHandles, handleId];
    const event = new CustomEvent('nodeDataChanged', {
      detail: { 
        nodeId: id, 
        data: { ...data, removedHandles: newRemovedHandles } 
      }
    });
    document.dispatchEvent(event);
  }, [id, data, removedHandles]);

  const handleOptionChange = useCallback((index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { text: value };
    setOptions(newOptions);
  }, [options]);

  const handleOptionBlur = useCallback(() => {
    const event = new CustomEvent('nodeDataChanged', {
      detail: { 
        nodeId: id, 
        data: { ...data, options: options } 
      }
    });
    document.dispatchEvent(event);
  }, [id, data, options]);

  const renderHandle = (handleId: string, position: Position, className: string) => {
    if (removedHandles.includes(handleId)) return null;

    return (
      <div
        className="relative"
        onMouseEnter={() => setHoveredHandle(handleId)}
        onMouseLeave={() => setHoveredHandle(null)}
      >
        <Handle
          type="source"
          position={position}
          id={handleId}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          isConnectable={isConnectable}
          className={className}
          key={`handle-${handleId}`}
        />
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden">
      <BaseNode 
        id={id} 
        data={data} 
        onLabelChange={handleLabelChange}
        icon={<MessageCircle className="w-4 h-4 text-gray-500" />}
      />

      <div className="">
        <select
          value={inputType}
          onChange={(e) => handleInputTypeChange(e.target.value as 'text' | 'options')}
          className="w-full text-sm border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 p-2"
        >
          <option value="text">{t('nodes.input.freeText')}</option>
          <option value="options">{t('nodes.input.multipleChoice')}</option>
        </select>

        <div className="mb-6 mt-4">
          <div className="flex items-center mb-1">
            <Variable className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('nodes.input.saveResponse')}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={config.variableName}
              onChange={(e) => handleConfigChange({ variableName: e.target.value })}
              className="flex-1 p-2 text-sm border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t('nodes.variable.selectVariable')}</option>
              {variables.map((variable) => (
                <option key={variable.id} value={variable.name}>
                  {variable.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {inputType === 'text' && (
          <div className="relative flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md mb-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Type className="w-4 h-4 mr-1" />
              <span>{t('nodes.input.textReceived')}</span>
            </div>
            {renderHandle('text', Position.Right, 'w-3 h-3 bg-blue-500')}
          </div>
        )}

        {inputType === 'options' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                {t('nodes.input.options')}
              </label>
              <button
                onClick={() => {
                  const newOptions = [...options, { text: '' }];
                  setOptions(newOptions);
                  const event = new CustomEvent('nodeDataChanged', {
                    detail: { 
                      nodeId: id, 
                      data: { ...data, options: newOptions } 
                    }
                  });
                  document.dispatchEvent(event);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={`option-${index}`} className="relative flex items-center">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    onBlur={handleOptionBlur}
                    placeholder={t('nodes.input.optionText')}
                    className="flex-1 p-2 text-sm border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 pr-8"
                  />
                  <button
                    onClick={() => handleOptionsChange(options.filter((_, i) => i !== index))}
                    className="absolute right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  {renderHandle(`option${index}`, Position.Right, 'w-3 h-3 mr-2 bg-blue-500')}
                </div>
              ))}

              <div className="relative flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('nodes.input.noMatchingOption')}
                </span>
                {renderHandle('no-match', Position.Right, 'w-3 h-3 bg-yellow-500')}
              </div>
            </div>
          </div>
        )}

        <div className="border-t dark:border-gray-700 pt-4">
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {t('nodes.input.timeout')}
              </label>
            </div>
            <input
              type="number"
              min="1"
              value={config.timeout}
              onChange={(e) => handleConfigChange({ timeout: parseInt(e.target.value) })}
              className="w-full p-2 text-sm border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="relative flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{t('nodes.input.timeoutOutput')}</span>
            </div>
            {renderHandle('timeout', Position.Right, 'w-3 h-3 bg-red-500')}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-300 dark:bg-gray-600"
      />
    </div>
  );
}