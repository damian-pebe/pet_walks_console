import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google'
import Dashboard from "./dashboard/Dashboard";
export default function Home() {
  return (
    <div>
      <Dashboard/>
      <Toaster />
      <GoogleAnalytics gaId="G-XYZ" />

    </div>
  );
}
