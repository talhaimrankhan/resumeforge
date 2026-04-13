import { useResumeEditor } from '../../../context/ResumeEditorContext'
import TemplateRenderer from '../../templates/TemplateRenderer'

export default function PreviewStep() {
  const { formData, templateId } = useResumeEditor()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Preview</h2>
        <p className="text-gray-400 text-sm">This is how your resume will look. Click "Finish &amp; Preview" to download.</p>
      </div>

      {/* Resume preview container */}
      <div className="bg-gray-100 rounded-2xl p-4 sm:p-8 overflow-auto">
        <div
          className="bg-white shadow-xl mx-auto"
          style={{ width: '210mm', minHeight: '297mm', maxWidth: '100%' }}
        >
          <TemplateRenderer templateId={templateId} data={formData} />
        </div>
      </div>
    </div>
  )
}
