import { title } from "process";
import { useState } from "react";
import Project, { IProject } from "../models/project";
import { projectService } from "../services/project.service";

const ProjectForm = () => {

    const [formData, setFormData] = useState<Omit<IProject, 'id' | 'image'> & { img: File | null }>({
        title: '',
        description: '',
        link: '',
        github: '',
        img: null,
        date: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    function validate(name: string, value?: string, file?: File): string  {
        switch (name) {
            case 'title':
                if (!value) return 'Title is required';
                else return '';
            case 'description':
                if (!value) return 'Description is required';
                else return '';
            case 'link':
                if (!value) return 'Link is required';
                else return '';
            case 'github':
                if (!value) return 'GitHub link is required';
                else return '';
            case 'img':
                if (file) {
                    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!validTypes.includes(file.type)) return 'Invalid image type';
                    else return '';
                } else return ""
            default:
                return '';
        }
    }

    function handleBlur (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }

    function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }

    function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData(prev => ({
            ...prev,
            img: file
        }));
    }

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validate all fields
        const newErrors: Record<string, string> = {};
        for (const [name, value] of Object.entries(formData)) {
            if(name === 'img') {
                const file = formData.img;
                const error = validate(name, undefined, file || undefined);
                if (error) newErrors[name] = error;
            } else {
                const error = validate(name, value as string);
                if (error) newErrors[name] = error;
            }
        }
        setErrors(newErrors);

        
        if (Object.keys(newErrors).length > 0) return;

        try {
            setLoading(true);
            const data= await projectService.createProject(formData);
            setFormData({
                title: '',
                description: '',
                link: '',
                github: '',
                img: null,
                date: new Date().toISOString().split('T')[0],
            });
            setErrors({});
        } catch (err: any) {
            console.error('Erreur lors de la création du projet:', err);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
      <h2>Créer un nouveau projet</h2>
      <form>
        <div>
          <label htmlFor="title">Titre</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}