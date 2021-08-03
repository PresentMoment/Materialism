import React from "react"
import { FormField } from "@sanity/base/components"
import { TextInput } from "@sanity/ui"
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent"

const GeoInput = React.forwardRef((props, ref) => {
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
  } = props

  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
    },
    [onChange]
  )

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
    >
      <TextInput
        onChange={handleChange}
        value={value} // Current field value
        readOnly={readOnly} // If "readOnly" is defined make this field read only
        placeholder={placeholder} // If placeholder is defined, display placeholder text
        onFocus={onFocus} // Handles focus events
        onBlur={onBlur} // Handles blur events
        ref={ref}
      />
    </FormField>
  )
})

// Create the default export to import into our schema
export default GeoInput
