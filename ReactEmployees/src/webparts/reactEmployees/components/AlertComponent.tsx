import { MessageBar, MessageBarType } from '@fluentui/react';
import * as React from 'react';

export interface IAlertProps {
  resetChoice?: () => void;
}

export let MyAlert = (props) => <h1>This is my Alert {props.alertName}</h1>

export const BlockedAlert = (p: IAlertProps) => (
  <MessageBar
    messageBarType={MessageBarType.blocked}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    truncated={true}
    overflowButtonAriaLabel="See more"
  >
    <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you
    use action buttons or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum
    aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac
    efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
    faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce
    massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget,
    condimentum mauris.
  </MessageBar>
);