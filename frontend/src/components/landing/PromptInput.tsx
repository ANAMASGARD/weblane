import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Send, Loader2, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

// Keep models for UI
const models = [
  { id: 'qwen-72b', name: 'Qwen-72B' },
  { id: 'llama-4', name: 'Llama 4 Maverick' },
  { id: 'claude-3', name: 'Deepseek-R1' },
  { id: 'gpt-4', name: 'GPT-4 Turbo' },
];

const PromptInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleVoiceCommand = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice input - replace with actual implementation if needed
      setTimeout(() => {
        setInputValue('Create a modern portfolio website with dark theme');
        setIsRecording(false);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Navigate to the builder page with the prompt in state
      navigate('/builder', { state: { prompt: inputValue } });
    } catch (error) {
      console.error('Error navigating to builder:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-12 mb-20 px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white backdrop-blur-sm bg-opacity-90 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <textarea
            id="prompt-input"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-5 py-4 outline-none resize-none rounded-xl text-gray-800 h-20"
            placeholder="Describe the website you want to create..."
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              >
                <span className="mr-2">{selectedModel.name}</span>
                <ChevronDown size={16} />
              </button>
              {isModelDropdownOpen && (
                <div className="absolute bottom-full mb-1 right-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200 ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={handleVoiceCommand}
              title="Use voice command"
            >
              <Mic size={18} />
            </div>
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isSubmitting}
              className="rounded-full w-10 h-10 p-0"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-4 text-center text-sm text-gray-500">
        Try: "Create a landing page for a coffee shop" or "Build a portfolio website with dark theme"
      </div>
    </div>
  );
};

export default PromptInput;