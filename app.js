// Curriculum Generator JavaScript
class CurriculumGenerator {
    constructor() {
        this.currentSection = 'example';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Event listeners serão adicionados quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEvents();
        });
    }

    setupEvents() {
        // Configurar eventos dos botões
        const generateExampleBtn = document.getElementById('generate-example-pdf');
        const createOwnBtn = document.getElementById('create-own-curriculum');
        const backToExampleBtn = document.getElementById('back-to-example');
        const generateFormPdfBtn = document.getElementById('generate-form-pdf');
        const previewBtn = document.getElementById('preview-curriculum');

        if (generateExampleBtn) {
            generateExampleBtn.addEventListener('click', () => this.generateExamplePDF());
        }
        if (createOwnBtn) {
            createOwnBtn.addEventListener('click', () => this.showCreateForm());
        }
        if (backToExampleBtn) {
            backToExampleBtn.addEventListener('click', () => this.showExample());
        }
        if (generateFormPdfBtn) {
            generateFormPdfBtn.addEventListener('click', () => this.generateFormPDF());
        }
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.previewResume());
        }
    }

    showExample() {
        document.getElementById('example-section').style.display = 'block';
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('preview-section').style.display = 'none';
        this.currentSection = 'example';
    }

    showCreateForm() {
        document.getElementById('example-section').style.display = 'none';
        document.getElementById('form-section').style.display = 'block';
        document.getElementById('preview-section').style.display = 'none';
        this.currentSection = 'form';
    }

    generateExamplePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Configurar fonte
        doc.setFont("helvetica");

        // Header com gradiente (simulado com cor sólida)
        doc.setFillColor(102, 126, 234); // Cor do gradiente
        doc.rect(0, 0, 210, 60, 'F');

        // Nome
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text('Kelvin Costa Maues', 105, 25, { align: 'center' });

        // Subtítulo
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text('Desenvolvedor de Software & Técnico em Informática', 105, 35, { align: 'center' });

        // Informações de contato
        doc.setFontSize(9);
        doc.text('Travessa Aimoré, 18, Manaus | (92) 9 85116243', 105, 45, { align: 'center' });
        doc.text('kelvincosta4545@gmail.com | https://kelvinmxzportifolio.vercel.app/', 105, 52, { align: 'center' });

        // Resetar cor do texto
        doc.setTextColor(0, 0, 0);
        
        let y = 75;

        // Resumo Profissional
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(102, 126, 234);
        doc.text('RESUMO PROFISSIONAL', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        y += 10;
        
        const resumoText = `Sou Técnico em Informática com sólida formação e ampla experiência em Desenvolvimento de software. 
Atualmente, estou cursando Ciência da Computação, o que tem ampliado ainda mais minha visão sobre 
tecnologia e inovação. Tenho profundo conhecimento em linguagens de programação, metodologias ágeis 
e boas práticas de desenvolvimento, aliado a uma abordagem criativa e eficiente para resolução de 
problemas e otimização de processos.

Sou apaixonado pela área de tecnologia e estou sempre em busca de novos desafios. Tenho grande 
interesse nas áreas de dados e visão computacional, onde vejo oportunidades empolgantes para aplicar 
inteligência artificial e análise de informações de forma estratégica.`;

        const resumoLines = doc.splitTextToSize(resumoText, 170);
        doc.text(resumoLines, 20, y);
        y += resumoLines.length * 5 + 10;

        // Habilidades
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(102, 126, 234);
        doc.text('HABILIDADES E COMPETÊNCIAS', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        y += 8;

        const skills = ['HTML & CSS', 'Java', 'Python', 'C++', 'MySQL', 'Banco de Dados', 'Back-end', 'Front-end', 
                       'Análise de Sistemas', 'Suporte Técnico', 'Git', 'Metodologias Ágeis', 'Visão Computacional'];
        
        doc.text(skills.join(' • '), 20, y);
        y += 15;

        // Experiência Profissional
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(102, 126, 234);
        doc.text('EXPERIÊNCIA PROFISSIONAL', 20, y);
        y += 10;

        // Visteon
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text('Estagiário de Desenvolvimento', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text('Visteon Corporation - Manaus, AM', 20, y + 5);
        doc.text('Abril 2025 - atual', 20, y + 10);
        
        const visteonDesc = `Estagiário de Desenvolvimento – Visteon Corporation. Atuação no desenvolvimento de sistemas e apoio a 
projetos, contribuindo para a otimização de processos e inovação em soluções tecnológicas. Essa experiência 
tem fortalecido minhas habilidades técnicas, minha visão de trabalho em equipe e meu desenvolvimento 
profissional em um ambiente corporativo.

• Utilização de ferramentas de controle de versão, como Git, gerenciando o código-fonte
• Criação de scripts de automação para otimizar processos repetitivos
• Manutenção e melhoria contínua de sistemas existentes`;

        const visteonLines = doc.splitTextToSize(visteonDesc, 170);
        doc.text(visteonLines, 20, y + 15);
        y += visteonLines.length * 4 + 25;

        // Nova página se necessário
        if (y > 250) {
            doc.addPage();
            y = 20;
        }

        // NaviView
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text('Desenvolvedor', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text('NaviView - Manaus, AM', 20, y + 5);
        doc.text('Junho 2023 - Dezembro 2024', 20, y + 10);
        
        const naviviewDesc = `Visão geral do projeto: O NaviView é um sistema que auxilia pessoas deficientes visuais em sua 
geolocalização e deslocamento por meio da tecnologia, visando à garantia de segurança e independência 
em sua locomoção, além da diminuição dos impactos causados pela falta de acessibilidade.

• Implementação de testes automatizados, garantindo a robustez e a confiabilidade do código
• Acompanhamento de tendências e avanços tecnológicos`;

        const naviviewLines = doc.splitTextToSize(naviviewDesc, 170);
        doc.text(naviviewLines, 20, y + 15);
        y += naviviewLines.length * 4 + 20;

        // Formação Acadêmica
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(102, 126, 234);
        doc.text('FORMAÇÃO ACADÊMICA', 20, y);
        y += 10;

        // Ciência da Computação
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text('Ciência da Computação', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text('Universidade Paulista - Janeiro 2025 - Janeiro 2029', 20, y + 5);
        
        const uniDesc = `Iniciei o Curso de Ciência da Computação na Universidade Paulista, buscando expandir meus 
conhecimentos e habilidades nas áreas de tecnologia e inovação. Com foco em desenvolver soluções 
criativas e eficientes, espero contribuir ativamente para o avanço do setor.`;

        const uniLines = doc.splitTextToSize(uniDesc, 170);
        doc.text(uniLines, 20, y + 10);
        y += uniLines.length * 4 + 15;

        // Técnico em Informática
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Técnico em Informática', 20, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text('Fundação Matias Machline - Janeiro 2022 - Dezembro 2024', 20, y + 5);
        
        const tecnicoDesc = `O curso ofereceu uma abordagem prática e teórica, proporcionando a capacidade de enfrentar 
desafios tecnológicos e colaborar efetivamente em projetos de equipe com uma formação abrangente e sólida.`;

        const tecnicoLines = doc.splitTextToSize(tecnicoDesc, 170);
        doc.text(tecnicoLines, 20, y + 10);

        // Salvar PDF
        doc.save('Curriculo_Kelvin_Costa_Maues.pdf');
    }

    generateFormPDF() {
        const formData = this.collectFormData();
        
        if (!this.validateFormData(formData)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Configurar fonte
        doc.setFont("helvetica");

        // Header
        doc.setFillColor(102, 126, 234);
        doc.rect(0, 0, 210, 60, 'F');

        // Nome
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text(formData.nome, 105, 25, { align: 'center' });

        // Profissão
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(formData.profissao, 105, 35, { align: 'center' });

        // Contato
        doc.setFontSize(9);
        const contactLine1 = `${formData.endereco || ''} | ${formData.telefone}`;
        const contactLine2 = `${formData.email} | ${formData.linkedin || ''}`;
        doc.text(contactLine1, 105, 45, { align: 'center' });
        doc.text(contactLine2, 105, 52, { align: 'center' });

        // Reset cor
        doc.setTextColor(0, 0, 0);
        let y = 75;

        // Resumo
        if (formData.resumo) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(102, 126, 234);
            doc.text('RESUMO PROFISSIONAL', 20, y);
            
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            y += 10;
            
            const resumoLines = doc.splitTextToSize(formData.resumo, 170);
            doc.text(resumoLines, 20, y);
            y += resumoLines.length * 5 + 15;
        }

        // Habilidades
        if (formData.habilidades) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(102, 126, 234);
            doc.text('HABILIDADES E COMPETÊNCIAS', 20, y);
            
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            y += 8;

            const skills = formData.habilidades.split(',').map(s => s.trim()).join(' • ');
            doc.text(skills, 20, y);
            y += 15;
        }

        // Experiência
        if (formData.experiencias && formData.experiencias.length > 0) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(102, 126, 234);
            doc.text('EXPERIÊNCIA PROFISSIONAL', 20, y);
            y += 10;

            formData.experiencias.forEach(exp => {
                if (exp.cargo) {
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(0, 0, 0);
                    doc.text(exp.cargo, 20, y);
                    
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    doc.text(`${exp.empresa} - ${exp.local}`, 20, y + 5);
                    doc.text(exp.periodo, 20, y + 10);
                    
                    if (exp.descricao) {
                        const descLines = doc.splitTextToSize(exp.descricao, 170);
                        doc.text(descLines, 20, y + 15);
                        y += descLines.length * 4 + 25;
                    } else {
                        y += 20;
                    }
                }
            });
        }

        // Nova página se necessário
        if (y > 250) {
            doc.addPage();
            y = 20;
        }

        // Formação
        if (formData.formacoes && formData.formacoes.length > 0) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(102, 126, 234);
            doc.text('FORMAÇÃO ACADÊMICA', 20, y);
            y += 10;

            formData.formacoes.forEach(edu => {
                if (edu.curso) {
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(0, 0, 0);
                    doc.text(edu.curso, 20, y);
                    
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    doc.text(`${edu.instituicao} - ${edu.periodo} - ${edu.status}`, 20, y + 5);
                    y += 15;
                }
            });
        }

        // Salvar PDF
        const fileName = `Curriculo_${formData.nome.replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);
    }

    collectFormData() {
        const data = {
            nome: document.getElementById('nome')?.value || '',
            profissao: document.getElementById('profissao')?.value || '',
            email: document.getElementById('email')?.value || '',
            telefone: document.getElementById('telefone')?.value || '',
            endereco: document.getElementById('endereco')?.value || '',
            linkedin: document.getElementById('linkedin')?.value || '',
            resumo: document.getElementById('resumo')?.value || '',
            habilidades: document.getElementById('habilidades')?.value || '',
            experiencias: [],
            formacoes: []
        };

        // Coletar experiências
        const expForms = document.querySelectorAll('.experience-form');
        expForms.forEach(form => {
            const cargo = form.querySelector('input[name="cargo[]"]')?.value || '';
            const empresa = form.querySelector('input[name="empresa[]"]')?.value || '';
            const periodo = form.querySelector('input[name="periodo[]"]')?.value || '';
            const local = form.querySelector('input[name="local[]"]')?.value || '';
            const descricao = form.querySelector('textarea[name="descricao[]"]')?.value || '';
            
            if (cargo || empresa) {
                data.experiencias.push({ cargo, empresa, periodo, local, descricao });
            }
        });

        // Coletar formações
        const eduForms = document.querySelectorAll('.education-form');
        eduForms.forEach(form => {
            const curso = form.querySelector('input[name="curso[]"]')?.value || '';
            const instituicao = form.querySelector('input[name="instituicao[]"]')?.value || '';
            const periodo = form.querySelector('input[name="periodo_edu[]"]')?.value || '';
            const status = form.querySelector('select[name="status[]"]')?.value || '';
            
            if (curso || instituicao) {
                data.formacoes.push({ curso, instituicao, periodo, status });
            }
        });

        return data;
    }

    validateFormData(data) {
        return data.nome && data.profissao && data.email && data.telefone;
    }

    previewResume() {
        const formData = this.collectFormData();
        
        if (!this.validateFormData(formData)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const previewContent = document.getElementById('preview-content');
        const previewSection = document.getElementById('preview-section');

        let html = `
            <div class="resume-header">
                <h2>${formData.nome}</h2>
                <p>${formData.profissao}</p>
                <div class="row mt-3">
                    <div class="col-md-6">
                        ${formData.endereco ? `<i class="fas fa-map-marker-alt me-2"></i>${formData.endereco}<br>` : ''}
                        <i class="fas fa-phone me-2"></i>${formData.telefone}
                    </div>
                    <div class="col-md-6">
                        <i class="fas fa-envelope me-2"></i>${formData.email}<br>
                        ${formData.linkedin ? `<i class="fas fa-link me-2"></i><a href="${formData.linkedin}" class="text-white">Portfolio</a>` : ''}
                    </div>
                </div>
            </div>
        `;

        if (formData.resumo) {
            html += `
                <div class="section-title mt-4">
                    <i class="fas fa-user"></i>
                    Resumo Profissional
                </div>
                <p>${formData.resumo}</p>
            `;
        }

        if (formData.habilidades) {
            html += `
                <div class="section-title mt-4">
                    <i class="fas fa-code"></i>
                    Habilidades e Competências
                </div>
                <div>
            `;
            
            formData.habilidades.split(',').forEach(skill => {
                html += `<span class="skill-tag">${skill.trim()}</span>`;
            });
            
            html += '</div>';
        }

        if (formData.experiencias.length > 0) {
            html += `
                <div class="section-title mt-4">
                    <i class="fas fa-briefcase"></i>
                    Experiência Profissional
                </div>
            `;
            
            formData.experiencias.forEach(exp => {
                if (exp.cargo || exp.empresa) {
                    html += `
                        <div class="experience-item">
                            <h5 class="text-primary">${exp.cargo}</h5>
                            <p class="mb-1"><strong>${exp.empresa}</strong> - ${exp.local}</p>
                            <p class="text-muted mb-2">${exp.periodo}</p>
                            ${exp.descricao ? `<p>${exp.descricao}</p>` : ''}
                        </div>
                    `;
                }
            });
        }

        if (formData.formacoes.length > 0) {
            html += `
                <div class="section-title mt-4">
                    <i class="fas fa-graduation-cap"></i>
                    Formação Acadêmica
                </div>
            `;
            
            formData.formacoes.forEach(edu => {
                if (edu.curso || edu.instituicao) {
                    html += `
                        <div class="mb-3">
                            <h6 class="text-primary">${edu.curso}</h6>
                            <p class="mb-1">${edu.instituicao}</p>
                            <p class="text-muted">${edu.periodo} - ${edu.status}</p>
                        </div>
                    `;
                }
            });
        }

        previewContent.innerHTML = html;
        previewSection.style.display = 'block';
        previewSection.scrollIntoView({ behavior: 'smooth' });
    }

    addExperience() {
        const container = document.getElementById('experiencias');
        const newForm = document.createElement('div');
        newForm.className = 'experience-form mb-3 p-3 border rounded';
        newForm.innerHTML = `
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Cargo" name="cargo[]">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Empresa" name="empresa[]">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Período (ex: Jan 2020 - Dez 2022)" name="periodo[]">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Local" name="local[]">
                </div>
            </div>
            <textarea class="form-control" rows="2" placeholder="Descrição das atividades..." name="descricao[]"></textarea>
            <button type="button" class="btn btn-outline-danger btn-sm mt-2" onclick="this.parentElement.remove()">
                <i class="fas fa-trash me-1"></i>Remover
            </button>
        `;
        container.appendChild(newForm);
    }

    addEducation() {
        const container = document.getElementById('formacoes');
        const newForm = document.createElement('div');
        newForm.className = 'education-form mb-3 p-3 border rounded';
        newForm.innerHTML = `
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Curso" name="curso[]">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Instituição" name="instituicao[]">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Período" name="periodo_edu[]">
                </div>
                <div class="col-md-6 mb-2">
                    <select class="form-select" name="status[]">
                        <option value="Concluído">Concluído</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Trancado">Trancado</option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm mt-2" onclick="this.parentElement.remove()">
                <i class="fas fa-trash me-1"></i>Remover
            </button>
        `;
        container.appendChild(newForm);
    }
}

// Funções globais para compatibilidade
function generateExamplePDF() {
    window.curriculumGenerator.generateExamplePDF();
}

function showCreateForm() {
    window.curriculumGenerator.showCreateForm();
}

function showExample() {
    window.curriculumGenerator.showExample();
}

function generatePDF() {
    window.curriculumGenerator.generateFormPDF();
}

function previewResume() {
    window.curriculumGenerator.previewResume();
}

function addExperience() {
    window.curriculumGenerator.addExperience();
}

function addEducation() {
    window.curriculumGenerator.addEducation();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.curriculumGenerator = new CurriculumGenerator();
});