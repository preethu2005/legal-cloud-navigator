
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProjectSummary: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-serif font-bold mb-6">Legal Cloud Navigator - Project Summary</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            A comprehensive legal services platform for clients and professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Legal Cloud Navigator is a web application designed to streamline legal services by providing 
            an intuitive platform for clients to manage legal documents, access AI-powered legal assistance, 
            and connect with legal professionals. The platform serves different user roles (clients and legal professionals) 
            with tailored experiences.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Frontend</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
                <li>React Router</li>
                <li>Lucide React</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Backend & Services</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Firebase Authentication</li>
                <li>Firebase Hosting</li>
                <li>Firebase Firestore (planned)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Authentication Flow</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>User navigates to login/register page</li>
              <li>Firebase authentication handles credential verification</li>
              <li>On successful authentication:
                <ul className="list-disc pl-5 mt-1">
                  <li>User session is established</li>
                  <li>Role-based information is stored in localStorage</li>
                  <li>User is redirected to the dashboard</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Application Flow</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Anonymous users land on the homepage with marketing content</li>
              <li>Users can register or login to access protected features</li>
              <li>Authenticated users are directed to their role-specific dashboard</li>
              <li>Users can access various services through the navigation menu:
                <ul className="list-disc pl-5 mt-1">
                  <li>Document management</li>
                  <li>AI legal assistant</li>
                  <li>Case tracking</li>
                  <li>Professional connection</li>
                </ul>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Current Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Authentication System:</span> Registration, login, protected routes, role-based access</li>
              <li><span className="font-medium">Navigation System:</span> Responsive navbar, mobile-friendly design</li>
              <li><span className="font-medium">Homepage:</span> Marketing content, direct dashboard access</li>
              <li><span className="font-medium">Dashboard:</span> Role-specific views</li>
              <li><span className="font-medium">Legal AI Assistant:</span> Question interface, suggested questions</li>
            </ul>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Planned Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Document Management:</span> Upload, storage, categorization, secure sharing</li>
              <li><span className="font-medium">Case Management:</span> Case creation, tracking, status updates</li>
              <li><span className="font-medium">Professional Directory:</span> Browse professionals, filtering, scheduling</li>
              <li><span className="font-medium">Notifications System:</span> Case updates, appointment reminders</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Client</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access to document management</li>
                <li>Ability to ask legal questions</li>
                <li>Case tracking</li>
                <li>Professional connection</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Legal Professional</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Client management</li>
                <li>Case management</li>
                <li>Document review and creation</li>
                <li>Client communication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Development & Deployment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Development Workflow</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Local development using npm run dev</li>
              <li>Code versioning with Git</li>
              <li>Deployment to Firebase Hosting for production</li>
            </ol>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Deployment Process</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Code is maintained in a Git repository</li>
              <li>Application is built using Vite build system</li>
              <li>Built application is deployed to Firebase Hosting</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSummary;
