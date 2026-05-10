// lib/ckeditor-config.ts
export const createEditorConfig = (locale: 'fa' | 'en' = 'fa') => {
  return {
    toolbar: {
      items: [
        'heading', '|',
        'bold', 'italic', 'link', '|',
        'bulletedList', 'numberedList', '|',
        'outdent', 'indent', '|',
        'imageUpload', 'blockQuote', 'insertTable', '|',
        'undo', 'redo'
      ],
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      ],
    },
    image: {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:alignCenter'],
      styles: ['alignLeft', 'alignRight', 'alignCenter'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    language: locale === 'fa' ? 'fa' : 'en',
  };
};