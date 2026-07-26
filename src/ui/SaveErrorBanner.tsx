import { useAppStore } from '../state/appStore'

export function SaveErrorBanner() {
  const saveError = useAppStore((s) => s.saveError)
  const dismiss = useAppStore((s) => s.dismissSaveError)
  if (!saveError) return null

  return (
    <div role="alert"
         className="flex items-center gap-3 bg-coral px-4 py-2 text-sm text-white">
      <span>
        {saveError === 'quota'
          ? 'Storage is full — your last change was not saved. Delete a character to free space.'
          : 'Your last change could not be saved.'}
      </span>
      <button onClick={dismiss} className="ml-auto rounded-pill bg-white/25 px-3 py-1">
        Dismiss
      </button>
    </div>
  )
}
