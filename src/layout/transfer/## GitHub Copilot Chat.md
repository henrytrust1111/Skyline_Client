## GitHub Copilot Chat

- Extension Version: 0.24.0 (prod)
- VS Code: vscode/1.97.0
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.121.6 (38 ms)
- DNS ipv6 Lookup: Error (29 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (578 ms)
- Node.js https: timed out after 10 seconds
- Node.js fetch: HTTP 200 (785 ms)
- Helix fetch: HTTP 200 (1748 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.21 (31 ms)
- DNS ipv6 Lookup: Error (32 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (17 ms)
- Electron fetch (configured): HTTP 200 (238 ms)
- Node.js https: HTTP 200 (2403 ms)
- Node.js fetch: HTTP 200 (3507 ms)
- Helix fetch: HTTP 200 (8210 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).