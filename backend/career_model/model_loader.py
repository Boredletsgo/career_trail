import os


MODEL_NAME = os.getenv('HF_MODEL_NAME', 'google/flan-t5-base')


try:
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
    USE_MODEL = True
except Exception as e:
    print('Warning: transformers model could not be loaded. Falling back to rule-based generator.', e)
    tokenizer = None
    model = None
    USE_MODEL = False