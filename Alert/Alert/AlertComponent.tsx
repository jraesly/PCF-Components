import * as React from 'react'
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert, AlertTitle} from '@material-ui/lab';
import { IPartialTheme, ThemeProvider, createTheme } from '@fluentui/react';
  

export interface IMessageProps {
  messageType?: string;
  messageTitle?: string | null;
  messageText?: string | null;
  showLink?: boolean;
  link?: string | undefined;
  linkText?: string | null;
  timeout?: number | null;
  open?: boolean;
  vertical: 'Top' | 'Bottom';
  horizontal: 'Left' | 'Center' | 'Right';
  themeJSON?: string;
}

const AlertControl: React.FC<IMessageProps> = ({ messageType, messageTitle, messageText, showLink, link, linkText, timeout, open,   vertical, horizontal, themeJSON}) => {
  // Render link if showLink is true
  let renderLink;
  if (showLink && link && linkText) {
    renderLink = <Link href={link} target="_blank">{linkText}</Link>;
  }
  
  function formatMessageType(messageType: string | undefined): "error" | "warning" | "info" | "success" | undefined {
    const allowedTypes = ["error", "warning", "info", "success"];
    
    // Check if messageType is one of the allowed types and return it
    if (messageType && allowedTypes.includes(messageType.toLowerCase())) {
      return messageType.toLowerCase() as "error" | "warning" | "info" | "success";
    }
  
    // Return undefined or a default value if messageType is not valid
    return undefined; // or you could return a default like "info"
  }
  const theme = React.useMemo(() => {
    try {
        return themeJSON ? createTheme(JSON.parse(themeJSON) as IPartialTheme) : undefined;
    } catch (ex) {
        /* istanbul ignore next */
        console.error('Cannot parse theme', ex);
    }
}, [themeJSON]);
    // Format and validate messageType
    const formattedMessageType = formatMessageType(messageType);
    const verticalPosition = vertical === 'Top' ? 'top' : 'bottom';
    const horizontalPosition = horizontal === 'Left' ? 'left' : horizontal === 'Right' ? "right" : "center";

  // Component render
  return (
    <ThemeProvider applyTo="none" theme={theme}>
      <Snackbar open={open} autoHideDuration={timeout} anchorOrigin={{vertical: verticalPosition, horizontal: horizontalPosition}}>
        <Alert severity={formattedMessageType} variant="outlined">
          <AlertTitle>{messageTitle}</AlertTitle>
          {messageText}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
export default AlertControl;
