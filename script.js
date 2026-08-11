document.addEventListener('DOMContentLoaded', () => {
  // 1. VisionAid Link Click Safeguard
  const visionAidLink = document.querySelector('.project-title-link');
  if (visionAidLink) {
    visionAidLink.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 2. Interactive Terminal Commands Engine
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        if (!cmd) return;

        // Display user input command in terminal
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-cmd-entry';
        cmdLine.innerHTML = `<span class="prompt">kishan@dev:~$</span> ${cmd}`;
        terminalOutput.appendChild(cmdLine);

        // Command Responses
        let responseHTML = '';
        switch (cmd) {
          case 'help':
            responseHTML = `<p class="output-text">Available commands:<br>
  - <b style="color:#60A5FA;">whoami</b>   : Developer profile summary<br>
  - <b style="color:#60A5FA;">skills</b>   : Technical languages & frameworks<br>
  - <b style="color:#60A5FA;">projects</b> : View featured work<br>
  - <b style="color:#60A5FA;">contact</b>  : Reach out via email, social & WhatsApp<br>
  - <b style="color:#60A5FA;">clear</b>    : Clear terminal screen<br>
  - <b style="color:#60A5FA;">help</b>     : Show this menu</p>`;
            break;

          case 'whoami':
            responseHTML = `<p class="output-text">Kishan - CSE Student & Full-Stack Developer specializing in web architectures, algorithms, and AI integration.</p>`;
            break;

          case 'skills':
            responseHTML = `<p class="tree-item">├── Languages : C/C++ (85%), Python (75%), HTML (25%), CSS (10%)<br>├── Core Dev  : React, Node.js, REST APIs, SQL, MongoDB<br>└── Vision/AI : OpenCV, Gemini API, Web Speech API</p>`;
            break;

          case 'projects':
            responseHTML = `<p class="output-text">🚀 <b style="color:#60A5FA;">VisionAid</b> (Hackathon Winner) - AI spatial mapping & navigation assistant.<br>💻 <b style="color:#60A5FA;">DevPortfolio Studio</b> - High-performance developer portfolio.<br>⚡ <b style="color:#60A5FA;">Algorithmic Visualizer</b> - Interactive search & pathfinding tool.</p>`;
            break;

          case 'contact':
            responseHTML = `<p class="output-text">📧 Mail: kishanl52pro.765@gmail.com<br>🔗 LinkedIn: linkedin.com/in/kishan-l-114aa4377<br>📸 Instagram: instagram.com/kishan.l765<br>💬 WhatsApp: +91 9945347632</p>`;
            break;

          case 'clear':
            terminalOutput.innerHTML = '';
            return;

          default:
            responseHTML = `<p class="output-text" style="color:#EF4444;">Command not found: '${cmd}'. Type '<b style="color:#60A5FA;">help</b>' for available commands.</p>`;
            break;
        }

        const respDiv = document.createElement('div');
        respDiv.innerHTML = responseHTML;
        terminalOutput.appendChild(respDiv);

        // Auto-scroll terminal to bottom
        const terminalBody = document.getElementById('terminal-body');
        if (terminalBody) {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      }
    });
  }

  // 3. Project Filter Buttons Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 4. Automatic PDF Resume Generation
  const downloadBtn = document.getElementById('download-cv-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const template = document.getElementById('resume-template');
      if (!template) return;

      template.style.display = 'block';

      const options = {
        margin:       0.4,
        filename:     'Kishan_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(options).from(template).save().then(() => {
        template.style.display = 'none';
      });
    });
  }

  // 5. Technical Proficiency Static Pie Chart
  const canvas = document.getElementById('skillsChart');
  if (canvas && typeof Chart !== 'undefined') {
    const ctx = canvas.getContext('2d');

    const sliceLabelsPlugin = {
      id: 'sliceLabelsPlugin',
      afterDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((element, index) => {
            const val = dataset.data[index];
            if (val === 0) return; // Skip 0% slices inside pie canvas

            const label = chart.data.labels[index];
            const { x, y, startAngle, endAngle, outerRadius } = element;
            const middleAngle = startAngle + (endAngle - startAngle) / 2;

            const textRadius = outerRadius * 0.62;
            const textX = x + Math.cos(middleAngle) * textRadius;
            const textY = y + Math.sin(middleAngle) * textRadius;

            ctx.font = '700 12px "Inter", sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 4;
            ctx.fillText(`${label} — ${val}%`, textX, textY);
          });
        });
        ctx.restore();
      }
    };

    new Chart(ctx, {
      type: 'pie',
      plugins: [sliceLabelsPlugin],
      data: {
        labels: ['C/C++', 'Python', 'HTML/CSS', 'JavaScript', 'SQL'],
        datasets: [{
          data: [85, 75, 25, 0, 0],
          backgroundColor: ['#60A5FA', '#A855F7', '#EF4444', '#F7DF1E', '#F97316'],
          borderWidth: 2,
          borderColor: '#111A2B'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: 0,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#94A3B8',
              font: {
                family: 'Inter',
                size: 13,
                weight: '500'
              },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i);
                    const val = data.datasets[0].data[i];
                    return {
                      text: `${label} — ${val}%`,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#0F172A',
            titleColor: '#F8FAFC',
            bodyColor: '#60A5FA',
            borderColor: '#1E293B',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }
});

