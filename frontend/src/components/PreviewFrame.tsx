import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");

  async function main() {
    if (!webContainer) {
      return;
    }
    
    try {
      // Install dependencies
      const installProcess = await webContainer.spawn('npm', ['install']);

      // Stream the install process output
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));

      // Wait for the installation to complete
      const installExitCode = await installProcess.exit;
      if (installExitCode !== 0) {
        console.error('Installation failed');
        return;
      }

      // Start the dev server
      const devProcess = await webContainer.spawn('npm', ['run', 'dev']);

      // Listen for the server-ready event
      webContainer.on('server-ready', (port, serverUrl) => {
        console.log('Server is ready at:', serverUrl);
        setUrl(serverUrl);
      });

      // Stream the dev process output
      devProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));
    } catch (error) {
      console.error('Error in preview:', error);
    }
  }

  useEffect(() => {
    if (webContainer && files && files.length > 0) {
      main();
    }
  }, [webContainer, files]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <p className="mb-2">Loading preview...</p>
          <p className="text-sm opacity-70">This may take a moment as dependencies are being installed</p>
        </div>
      )}
      {url && (
        <iframe 
          width="100%" 
          height="100%" 
          src={url}
          className="border-0 rounded-md"
          title="Website preview"
        />
      )}
    </div>
  );
}