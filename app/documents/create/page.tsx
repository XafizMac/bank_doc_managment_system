"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { FileCheck, FileText, Save, SendHorizontal, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateDocumentPage() {
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [client, setClient] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setIsSaving(false);
      router.push("/documents");
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/documents");
    }, 1000);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Создать новый документ</h2>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Сведения о документе</CardTitle>
            <CardDescription>
             Введите сведения о новом документе, который нужно создать
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Название документа</Label>
                <Input 
                  id="title" 
                  placeholder="Введите название"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Тип документа</Label>
                <Select value={documentType} onValueChange={setDocumentType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Выбрать тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loan-agreement">Кредитный договор</SelectItem>
                    <SelectItem value="credit-assessment">Оценка кредитоспособности</SelectItem>
                    <SelectItem value="mortgage-contract">Ипотечный договор</SelectItem>
                    <SelectItem value="client-onboarding">Адаптация клиента</SelectItem>
                    <SelectItem value="annual-report">Годовой отчет</SelectItem>
                    <SelectItem value="audit-report">Аудиторский отчет</SelectItem>
                    <SelectItem value="employee-contract">Трудовой договор с работником</SelectItem>
                    <SelectItem value="service-agreement">Соглашение об обслуживании</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client">Клиент</Label>
                <Select value={client} onValueChange={setClient} required>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Выбрать Клиент" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson-enterprises">Джонсон Энтерпрайзис"</SelectItem>
                    <SelectItem value="smith-family-trust">Семейный фонд Смитов</SelectItem>
                    <SelectItem value="emily-parker">Эмили Паркер</SelectItem>
                    <SelectItem value="tech-solutions-inc">Компания Tech Solutions Inc.</SelectItem>
                    <SelectItem value="global-finance-corp">Глобальная финансовая корпорация</SelectItem>
                    <SelectItem value="internal">Внутренний</SelectItem>
                    <SelectItem value="hr-department">Отдел кадров</SelectItem>
                    <SelectItem value="cloud-systems-ltd">ООО "Облачные системы"</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assigned">Назначенный Для</Label>
                <Select value={assignedTo} onValueChange={setAssignedTo} required>
                  <SelectTrigger id="assigned">
                    <SelectValue placeholder="Назначенный Для" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex-johnson">Асанов Усон</SelectItem>
                    <SelectItem value="sarah-williams">Сара Кубатов</SelectItem>
                    <SelectItem value="michael-chen">Дубай Кимсанов</SelectItem>
                    <SelectItem value="emma-davis">Кубат Арген уулу</SelectItem>
                    <SelectItem value="robert-smith">Роберт Иванов</SelectItem>
                    <SelectItem value="jennifer-lee">Жьюнифер Ли</SelectItem>
                    <SelectItem value="david-miller">Давид Миллер</SelectItem>
                    <SelectItem value="lisa-garcia">Лиса Гарсия</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea 
                id="description" 
                placeholder="Введите описание документа"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="files">Вложения</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="files" 
                  type="file" 
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border px-3 py-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSaving || isSubmitting}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Сохронение...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить как черновик
                </span>
              )}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  type="button"
                  disabled={isSubmitting || isSaving}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      Отправить документ
                    </span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Document</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit this document? Once submitted, it will be sent for review and you won't be able to edit it without creating a new version.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Submit Document
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}