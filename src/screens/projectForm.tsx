
import { useState } from "react";
import  { IProject } from "../models/project";
import { projectService } from "../services/project.service";
import '../style/projectform.css'
import { useTranslation } from "react-i18next";

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
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {t}= useTranslation();

    function isUrl(str: string): boolean {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    }

    function validate(name: string, value?: string, file?: File): string  {
        switch (name) {
            case 'title':
                if (!value) return t('projectForm.titleRequired');
                else return '';
            case 'description':
                if (!value) return t('projectForm.descriptionRequired');
                if (value.length>300) return t('projectForm.descriptionCaracter')
                else return '';
            case 'link':
                if (value && !isUrl(value)) return t('projectForm.invalidUrl');
                else return '';
            case 'github':
                if (!value) return t('projectForm.githubRequired');
                else if (!isUrl(value)) return t('projectForm.invalidUrl');
                else return '';
            case 'img':
                if (file) {
                    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!validTypes.includes(file.type)) return t('projectForm.invalidImage');
                    else return '';
                } else return ""
            default:
                return '';
        }
    }

    function handleBlur (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
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
            console.log('Projet créé:', data);
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
    <div className="project_form_container">

      <form  onSubmit={handleSubmit} id="form">
        <h2>{t('projectForm.newProject')}</h2>
        <div>
          <label htmlFor="title">{t('projectForm.title')}</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} />
          <span className="error">{errors.title}</span>
        </div>
        <div>
          <label htmlFor="description">{t('projectForm.description')}</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur}></textarea>
          <span className="error">{errors.description}</span>
        </div>
        <div>
          <label htmlFor="link">{t('projectForm.link')}</label>
          <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} onBlur={handleBlur} />
          <span className="error">{errors.link}</span>
        </div>
        <div>
          <label htmlFor="github">{t('projectForm.github')}</label>
          <input type="url" id="github" name="github" value={formData.github} onChange={handleChange} onBlur={handleBlur} />
          <span className="error">{errors.github}</span>
        </div>
        <div className="form_group_file">
          <label htmlFor="img">{t('projectForm.image')}</label>
          <div className="file_input_container">
            <input type="file" id="img" name="img" accept="image/*" onChange={handleFileChange} />
            <span>{formData.img ? <><img src={URL.createObjectURL(formData.img)}  alt="Aperçu" /> { formData.img.size / (1024 * 1024)}MB</>  : t('projectForm.noImage')}</span>
          </div>
          <span className="error">{errors.img}</span>
        </div>
        <button id="form" type="submit">{t('creer')}</button>
      </form>
    </div>
  );
}

export default ProjectForm;