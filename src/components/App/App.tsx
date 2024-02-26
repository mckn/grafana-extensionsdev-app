import React from 'react';
import { AppRootProps, PluginExtensionTypes } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { Button, Field, Form, Input, InputControl, Legend, Select } from '@grafana/ui';

export function App(props: AppRootProps) {
  //@ts-ignore
  const { registerExtensions } = props;

  return (
    <PluginPage>
      <Form
        onSubmit={(data) => {
          const { pointId, title, description, icon, category } = data;

          registerExtensions([
            {
              type: PluginExtensionTypes.link,
              title: title,
              description,
              extensionPointId: pointId.value,
              icon: icon?.value,
              category,
              onClick: () => alert('Hello world!'),
            },
          ]);
        }}
      >
        {({ register, errors, control }) => {
          return (
            <>
              <Legend>Register extensions</Legend>

              <Field label="Point Id" invalid={!!errors.pointId} error="Point Id is required">
                <InputControl
                  name="pointId"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: 'grafana/alerting/instance/action', label: 'grafana/alerting/instance/action' },
                        { value: 'grafana/commandpalette/action', label: 'grafana/commandpalette/action' },
                        { value: 'grafana/dashboard/panel/menu', label: 'grafana/dashboard/panel/menu' },
                        { value: 'grafana/datasources/config', label: 'grafana/datasources/config' },
                        { value: 'grafana/explore/toolbar/action', label: 'grafana/explore/toolbar/action' },
                        { value: 'grafana/user/profile/tab', label: 'grafana/user/profile/tab' },
                      ]}
                    />
                  )}
                />
              </Field>

              <Field label="Title" invalid={!!errors.title} error="Title is required">
                <Input {...register('title', { required: true })} placeholder="Open hello world!" />
              </Field>

              <Field label="Description">
                <Input {...register('description')} placeholder="" />
              </Field>

              <Field label="Icon">
                <InputControl
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: 'anchor', label: 'anchor', icon: 'anchor' },
                        { value: 'apps', label: 'apps', icon: 'apps' },
                        { value: 'cloud', label: 'cloud' },
                        { value: 'favorite', label: 'favorite' },
                        { value: 'shield', label: 'shield' },
                        { value: 'user', label: 'user' },
                      ]}
                    />
                  )}
                />
              </Field>

              <Field label="Category">
                <Input {...register('category')} placeholder="" />
              </Field>

              <Button type="submit">Register</Button>
            </>
          );
        }}
      </Form>
    </PluginPage>
  );
}
