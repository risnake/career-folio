import type { Dispatch } from 'react';
import type { ResumeContact } from '../../../data/resumes';
import type { BuilderAction } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';

interface ContactStepProps {
  name: string;
  contact: ResumeContact;
  errors: Record<string, string>;
  dispatch: Dispatch<BuilderAction>;
}

export default function ContactStep({ name, contact, errors, dispatch }: ContactStepProps) {
  const addresses = contact.addresses ?? [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Full Name *"
          name="name"
          value={name}
          onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })}
          error={errors.name}
          placeholder="John Doe"
        />

        <FormField
          label="Email *"
          name="email"
          type="email"
          value={contact.email}
          onChange={(e) => dispatch({ type: 'SET_CONTACT', contact: { email: e.target.value } })}
          error={errors.email}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={contact.phone ?? ''}
          onChange={(e) => dispatch({ type: 'SET_CONTACT', contact: { phone: e.target.value } })}
          placeholder="(555) 123-4567"
        />

        <FormField
          label="LinkedIn"
          name="linkedin"
          value={contact.linkedin ?? ''}
          onChange={(e) => dispatch({ type: 'SET_CONTACT', contact: { linkedin: e.target.value } })}
          placeholder="linkedin.com/in/yourname"
        />
      </div>

      <FormField
        label="Website"
        name="website"
        value={contact.website ?? ''}
        onChange={(e) => dispatch({ type: 'SET_CONTACT', contact: { website: e.target.value } })}
        placeholder="yourwebsite.com"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Addresses</label>
        <DynamicList
          items={addresses}
          onAdd={() =>
            dispatch({ type: 'SET_CONTACT', contact: { addresses: [...addresses, ''] } })
          }
          onRemove={(index) =>
            dispatch({
              type: 'SET_CONTACT',
              contact: { addresses: addresses.filter((_, i) => i !== index) },
            })
          }
          renderItem={(addr, index) => (
            <input
              type="text"
              value={addr}
              onChange={(e) => {
                const updated = [...addresses];
                updated[index] = e.target.value;
                dispatch({ type: 'SET_CONTACT', contact: { addresses: updated } });
              }}
              placeholder="123 Main St, City, State ZIP"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
            />
          )}
          addLabel="Add address"
        />
      </div>
    </div>
  );
}
