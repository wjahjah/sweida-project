import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data);
  };

  const deleteProject = async (id) => {
    if(window.confirm('Are you sure?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div className="p-8 font-sans" dir="ltr">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-800">Projects Management</h1>
        <button className="bg-sweida-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <FiPlus /> Add New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{project.name_en}</h3>
              <p className="text-slate-400 text-sm">{project.category}</p>
            </div>
            <div className="flex gap-3">
              <button className="p-3 text-blue-500 hover:bg-blue-50 rounded-lg"><FiEdit /></button>
              <button onClick={() => deleteProject(project.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;