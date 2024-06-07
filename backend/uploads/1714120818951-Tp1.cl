(setq reseau 
    '((a e 56)(a c 85)(a b 41)(b e 59)(c f 80)))

(defun heuristique (etat)
 (cond 
    ((equal etat 'a) 24)
    ((equal etat 'b) 12)
    ((equal etat 'c) 56)
    ((equal etat 'd) 88)
    ((equal etat 'e) 95)
    ((equal etat 'f) 32)))

(defun succ (etat L)
 (cond
    ((null L) nil)
    ((equal etat (caar L)) (cons (cadar L) (succ etat (cdr L))))
    (t (succ etat (cdr L)))))

(setq open '((A Z 41 324) (A S 140 366) (Z O 71 110) (O Z 151 200)))

(defun somme-derniers (tuple)
 (+ (car (cdr (cdr tuple))) (car (cdr (cdr (cdr tuple))))))

(defun inserer (new open)
 (if (null open)
      (cons new nil)
      (if (< (somme-derniers new) (somme-derniers (car open)))
          (cons new open)
        (cons (car open) (inserer new (cdr open))))))

(defun supprimer (tuple open)
 (cond ((null open) nil)
        ((equal tuple (car open)) (cdr open))
        (t (cons (car open) (supprimer tuple (cdr open))))))

(defun rechercher (etat open)
 "Recherche un élément dans 'open' basé sur l'état donné."
 (cond
    ((null open) nil) ; Si la liste 'open' est vide, retourne 'nil'
    ((equal etat (caar open)) (car open)) ; Si l'état correspond, retourne le tuple
    (t (rechercher etat (cdr open))))) ; Appel récursif pour continuer la recherche

(defvar *open* nil) ; Define *open* as a global variable
(defvar *closed* nil) ; Define *closed* as a global variable
(defvar *goal* nil) ; Define *goal* as a global variable

(defun run_astar(start goal)
 (setq *open* (list (list start nil 0 (heuristique start))))
 (setq *closed* nil)
 (setq *goal* goal)
 (astar))

(defun astar ()
 (cond 
   ((null *open*) nil)
   (t (setq *open* (cons (car *open*) *closed*))
      (cond ((equal *goal* (car (car *open*))) (cons-sol *goal*))
            (t (insert-descendants (car *open*) reseau)
               (astar))))))

(defun cons-sol (etat)
 (cond ((null etat) nil)
        (t (cons etat (cons-sol (car (cdr (rechercher etat *closed*))))))))

(defun insert-descendants (state reseau)
 (let ((descendants (succ state reseau)))
    (dolist (descendant descendants)
      (setq *open* (inserer (list descendant state (somme-derniers descendant) (heuristique descendant)) *open*)))))
