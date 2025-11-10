import { Github, Twitter, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-black text-2xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FREEFLOW
            </h3>
            <p className="text-sm text-muted-foreground">
              The Internet, Reborn on the Blockchain.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-foreground">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Forum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-foreground">Integrations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://sideshift.ai" target="_blank" rel="noopener" className="hover:text-primary transition-colors">SideShift API</a></li>
              <li><a href="https://ipfs.io" target="_blank" rel="noopener" className="hover:text-primary transition-colors">IPFS</a></li>
              <li><a href="https://arweave.org" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Arweave</a></li>
              <li><a href="https://ens.domains" target="_blank" rel="noopener" className="hover:text-primary transition-colors">ENS Domains</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 FREEFLOW Protocol. Built for freedom.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <Globe className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
